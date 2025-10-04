# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

JSONPost is a headless form backend SaaS built with Next.js 15 (App Router), React 19, TypeScript, and Supabase. It allows users to create form endpoints, collect submissions, and integrate with external services (Google Sheets, Zapier, n8n, Svix webhooks).

## Commands

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Production build with Turbopack
npm start            # Start production server
npm run lint         # Run ESLint

# Database
# Run schema.sql in Supabase SQL editor to set up database
```

## Architecture Overview

### Core Data Model

**Projects** (user workspaces) → **Endpoints** (form submission URLs) → **Submissions** (form data)

Users create projects, each project has multiple endpoints with unique paths. Each endpoint receives form submissions via `/api/submit/[projectId]/[endpointPath]`.

### Main Submission Flow

File: `src/app/api/submit/[projectId]/[endpointPath]/route.ts`

**Execution order** (critical to maintain):
1. CORS validation & authentication
2. Request parsing (JSON/FormData/multipart)
3. JSON schema validation (AJV)
4. Database storage (`submissions` table)
5. File uploads (Supabase Storage)
6. Update monthly submission counts
7. Svix webhooks
8. Direct/legacy webhooks
9. Email notifications
10. **Zapier webhooks**
11. **Google Sheets write**
12. **n8n webhooks**
13. Autoresponder emails

**Important**: Integration failures are non-blocking. Submission succeeds even if external services fail.

### Authentication Patterns

**User Auth** (Supabase):
```typescript
import { createClient } from '@/lib/supabase-server'
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

**API Key Auth** (Zapier/n8n):
- Header: `X-JSONPOST-API-KEY` or `x-n8n-api-key`
- Stored in `profiles.zapier_api_key` and `projects.n8n_api_key`
- Use service role client to query by API key

**OAuth** (Google Sheets):
- Project-level connection stores tokens in `projects` table
- Token refresh logic required before API calls
- Access token expires, refresh token is long-lived

### Middleware

File: `src/middleware.ts`

**Rate Limiting** (Redis/Upstash):
- Applied to `/api/submit/*` routes only
- 5 requests per 10 seconds AND 100 requests per minute
- Per IP + endpoint combination
- Returns 429 with `Retry-After` header

**Authentication**:
- Redirects unauthenticated users to `/auth/login`
- Public paths array for API routes that don't require session auth

### Database Patterns

**Service Role Client** (bypasses RLS):
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

**Always verify ownership** before operations:
```typescript
// Join with projects table to verify user_id
.select('*, projects!inner(user_id)')
.eq('projects.user_id', user.id)
```

### Integration Architecture

**Webhook Subscriptions Pattern**:
1. User configures integration (gets API key)
2. External service calls `/api/{integration}/subscribe` with webhook URL
3. Stored in `{integration}_subscriptions` table with `is_active` flag
4. Submission endpoint queries active subscriptions
5. Sends payload via `Promise.allSettled()` for parallel delivery
6. Status tracked in `submissions.{integration}_status` field

**Active Integrations**:
- **Zapier**: `zapier_subscriptions` table, data flattening for field mapping
- **n8n**: `n8n_subscriptions` table, similar to Zapier
- **Google Sheets**: OAuth at project level, config at endpoint level, writes to spreadsheet on submission
- **Svix**: Webhook management with signatures and retry logic
- **DodoPayments**: Billing webhooks for subscription lifecycle

### Billing & Plans

File: `src/lib/plans.ts`

Plans: FREE, PRO, GROWTH, ENTERPRISE

**Limit Enforcement**:
- Check before creation: `canCreateProject()`, `canCreateEndpoint()`
- Submission counts tracked in `monthly_submission_counts` table
- DodoPayments webhooks update `profiles.plan` and subscription fields

**Plan Changes**:
- FREE → Paid: Checkout flow via `/checkout` route
- Paid → Paid: API call to `/api/subscription/change-plan` (prorated)

### Form Builder

Route: `/dashboard/projects/[id]/endpoints/[endpointId]/form-builder`

**Key Features**:
- 16 field types, 29 themes, 14 templates
- Auto-saves to localStorage (24hr expiration)
- Saves to `endpoints.form_json` (JSONB)
- Generates production URLs for single-page/multi-step forms
- Short link generation (`short_links` table)
- Embed code generation (modal, chatbox, drawer, button)

### File Uploads

**Storage**: Supabase Storage bucket `form-uploads`
**Path**: `{projectId}/{endpointId}/{timestamp}-{filename}`
**Metadata**: Stored in `file_uploads` table
**Download**: `/api/files/[fileId]/download` with presigned URLs

### Data Transformation

**Zapier Data Flattening** (required for field mapping):
```typescript
// Nested: { user: { email: "x" } } → { user_email: "x" }
// Arrays: { tags: ["a", "b"] } → { tags_0: "a", tags_1: "b", tags_count: 2 }
```

**Webhook JSON Transformation** (optional):
- Configured per endpoint: `webhook_json_transformation_enabled`
- Template stored in `webhook_json_transformation_template` (JSONB)
- Applied before webhook delivery

### Variable Paths

**Discovery**: Extracted from submission data structure
**Storage**: `endpoints.variable_paths` array
**Usage**: Google Sheets column selection, transformation templates

Example: `{ user: { email: "x" } }` → variable path `"user.email"`

## Key Files

**Core Logic**:
- `src/middleware.ts` - Auth + rate limiting
- `src/app/api/submit/[projectId]/[endpointPath]/route.ts` - Main submission handler
- `src/lib/plans.ts` - Plan definitions and limits
- `src/lib/billing.ts` - Usage checks (`canCreateProject`, etc.)

**Integration Helpers**:
- `src/lib/email.ts` - Email sending (Resend)
- `src/lib/autoresponder.ts` - Autoresponder email logic

**Form Builder**:
- `src/components/form-generator/` - Form wizard components
- `form_definitions/` - Template JSON files

## Environment Variables

**Required**:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Redis (Rate Limiting)
KEY_VALUE_STORE_KV_REST_API_URL=
KEY_VALUE_STORE_KV_REST_API_TOKEN=

# App
NEXT_PUBLIC_APP_URL=

# Email
RESEND_API_KEY=

# DodoPayments
DODO_PAYMENTS_API_KEY=
DODO_PAYMENTS_ENVIRONMENT=test_mode|live_mode
DODO_WEBHOOK_SECRET=
DODO_PRO_PRODUCT_ID=
DODO_GROWTH_PRODUCT_ID=
NEXT_PUBLIC_DODO_PRO_PRODUCT_ID=
NEXT_PUBLIC_DODO_GROWTH_PRODUCT_ID=

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Svix
SVIX_AUTH_TOKEN=
```

## Critical Patterns

### Adding New Integration

1. Create API routes in `/api/{integration}/`:
   - `auth/route.ts` or `auth/validate/route.ts` - Validate API key/credentials
   - `subscribe/route.ts` - Create webhook subscription
   - `unsubscribe/route.ts` - Remove subscription
   - `endpoints/route.ts` or `projects/endpoints/route.ts` - List available endpoints

2. Add database table:
   ```sql
   CREATE TABLE {integration}_subscriptions (
     id uuid PRIMARY KEY,
     user_id or project_id uuid REFERENCES ...,
     endpoint_id uuid REFERENCES endpoints,
     target_url text,
     is_active boolean DEFAULT true,
     created_at timestamp with time zone DEFAULT now()
   );
   ```

3. Update `src/middleware.ts` publicPaths if routes need to bypass auth

4. Add to submission endpoint (maintain execution order):
   - Query subscriptions
   - Prepare payload
   - Send via `Promise.allSettled()`
   - Update status field in submissions table

5. Add configuration UI in dashboard

6. Document in `/dev_docs/{integration}-integration.md`

### Modifying Submission Logic

**Location**: `src/app/api/submit/[projectId]/[endpointPath]/route.ts`

**Before modifying**:
1. Review execution order comments
2. Test with all content types: JSON, FormData, multipart
3. Test with file uploads
4. Verify integration deliveries still work
5. Check error handling doesn't block submission success

**Key considerations**:
- Never fail submission due to integration failures
- Maintain parallel webhook delivery with `Promise.allSettled()`
- Update status fields for monitoring (`zapier_status`, `google_sheets_status`, etc.)
- Log all operations for debugging

### Token Refresh (OAuth Integrations)

**Pattern** (Google Sheets):
```typescript
// Check expiration
const now = new Date()
const expiresAt = new Date(project.google_sheets_token_expires_at)

if (now >= expiresAt && project.google_sheets_refresh_token) {
  // Call Google OAuth token endpoint
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: project.google_sheets_refresh_token,
      grant_type: 'refresh_token'
    })
  })

  const { access_token, expires_in } = await response.json()

  // Update database
  await supabase
    .from('projects')
    .update({
      google_sheets_access_token: access_token,
      google_sheets_token_expires_at: new Date(now.getTime() + expires_in * 1000)
    })
    .eq('id', projectId)
}
```

## Documentation

**Developer Docs**: `/dev_docs/` - Comprehensive technical documentation
- `00-GETTING-STARTED.md` - Quick start guide
- `README.md` - Documentation index
- `06-form-builder.md` - Form builder feature documentation
- `DOCUMENTATION-STATUS.md` - Documentation completion status

**Old Docs** (root folder, may be outdated):
- `N8N_INTEGRATION_DOCUMENTATION.md` - n8n integration
- `FORM_SUBMISSION_LOGIC.md` - Submission endpoint (superseded by dev_docs)

## Security Notes

- **RLS Policies**: Always verify user ownership via joins, never trust client input
- **API Keys**: Store unhashed in database (consider hashing in future), never expose in client code
- **File Uploads**: Validate types and sizes, consider virus scanning
- **Rate Limiting**: Only on `/api/submit/*`, consider extending to other endpoints
- **Webhook Signatures**: Not implemented for Zapier/n8n (consider adding HMAC)
- **CORS**: Validate origin against endpoint's `allowed_domains` array

## Troubleshooting

**Webhook not receiving data**:
1. Check subscription `is_active` in database
2. Verify webhook URL is accessible
3. Check status fields in submissions table
4. Review application logs for delivery errors

**Authentication failures**:
1. Verify token expiration (OAuth)
2. Check API key matches database
3. Ensure RLS policies allow operation
4. Verify user owns the resource

**Rate limit errors**:
1. Check Redis connection
2. Verify IP extraction in middleware
3. Review rate limit configuration

**Database queries**:
```sql
-- Check subscription status
SELECT * FROM zapier_subscriptions WHERE endpoint_id = 'uuid' AND is_active = true;

-- Check recent submissions
SELECT s.*, e.name FROM submissions s
JOIN endpoints e ON s.endpoint_id = e.id
WHERE e.id = 'uuid' ORDER BY s.created_at DESC LIMIT 10;

-- Check user's plan and usage
SELECT p.plan, COUNT(pr.id) as projects, COUNT(e.id) as endpoints
FROM profiles p
LEFT JOIN projects pr ON p.id = pr.user_id
LEFT JOIN endpoints e ON pr.id = e.project_id
WHERE p.id = 'user-uuid'
GROUP BY p.plan;
```
