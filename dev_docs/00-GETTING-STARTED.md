# Getting Started with JSONPost Development

## What is JSONPost?

JSONPost is a headless form backend SaaS that allows developers to create form endpoints instantly and start collecting submissions without setting up backend infrastructure. It's built with Next.js 15, React 19, Supabase, and integrates with multiple third-party services.

## Documentation Structure

This `/dev_docs` folder contains comprehensive technical documentation organized by feature/module. Start with the README.md for an overview, then dive into specific documents as needed.

## For New Developers

### 1. First Steps

1. **Read**: Start with README.md for the big picture
2. **Architecture**: Review 01-architecture-overview.md to understand system design
3. **Database**: Study 02-database-schema.md to understand data model
4. **Authentication**: Read 04-authentication-and-security.md

### 2. Core Concepts

**Projects**: Users create projects to organize their form endpoints
**Endpoints**: Each project has multiple endpoints (form submission URLs)
**Submissions**: Data submitted to endpoints
**Integrations**: Connect to Google Sheets, Zapier, n8n, etc.

### 3. Key Features to Understand

1. **Form Submission Flow** (05-submission-endpoint.md)
   - How data flows from form → database → integrations
   
2. **Form Builder** (06-form-builder.md)
   - Visual form creation tool with templates and themes

3. **Billing System** (10-dodopayments-billing.md)
   - Plans, limits, and subscription management

4. **Integrations** (07-11)
   - How external services connect to JSONPost

## Quick Development Guide

### Running Locally

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your credentials

# Run development server
npm run dev
```

### Making Changes

**Adding a Feature:**
1. Design database schema changes
2. Create API routes
3. Build UI components
4. Test thoroughly
5. Update documentation

**Modifying Submission Logic:**
- Main file: `src/app/api/submit/[projectId]/[endpointPath]/route.ts`
- Be careful: this affects all form submissions

**Adding Integration:**
1. Create API routes in `/api/{integration}/`
2. Add database fields
3. Build configuration UI
4. Integrate into submission flow
5. Document thoroughly

### Testing Your Changes

1. **Manual Testing**:
   - Submit test forms
   - Check database records
   - Verify webhook deliveries
   - Test edge cases

2. **Integration Testing**:
   - Test with actual third-party services (use test modes)
   - Verify OAuth flows
   - Check webhook deliveries

3. **Security Testing**:
   - Test authentication boundaries
   - Verify RLS policies
   - Check API key validation
   - Test rate limiting

## Common Development Patterns

### Database Queries with Supabase

```typescript
// Always use service role for admin operations
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Query with RLS bypass
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId)
  .single()
```

### Authentication in API Routes

```typescript
import { createClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Continue with authenticated request...
}
```

### Webhook Integration Pattern

```typescript
// 1. Create subscription API
POST /api/{integration}/subscribe
{
  endpoint_id: string
  webhook_url: string
}

// 2. Store in database
INSERT INTO {integration}_subscriptions

// 3. In submission endpoint
const { data: subscriptions } = await supabase
  .from('{integration}_subscriptions')
  .select('*')
  .eq('endpoint_id', endpointId)
  .eq('is_active', true)

// 4. Send to webhooks
for (const sub of subscriptions) {
  await fetch(sub.webhook_url, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}
```

## File Structure Guide

```
src/
├── app/
│   ├── (auth routes)
│   ├── dashboard/          # Protected dashboard pages
│   ├── api/                # API route handlers
│   │   ├── submit/         # Main submission endpoint
│   │   ├── zapier/         # Zapier integration
│   │   ├── n8n/            # n8n integration
│   │   ├── google-sheets/  # Google Sheets
│   │   └── webhook/        # Webhook handlers
│   ├── page.tsx            # Landing page
│   └── layout.tsx          # Root layout
├── components/
│   ├── auth/              # Auth components
│   ├── dashboard/         # Dashboard components
│   ├── form-generator/    # Form builder
│   ├── ui/                # UI primitives
│   └── schema-builder/    # JSON schema builder
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── plans.ts           # Subscription plans
│   ├── billing.ts         # Billing utilities
│   ├── email.ts           # Email sending
│   └── autoresponder.ts   # Autoresponder logic
└── middleware.ts          # Auth + rate limiting
```

## Debugging Tips

### Enable Verbose Logging

The submission endpoint includes extensive logging. Check logs for:
- `logger.info()` - General flow
- `logger.success()` - Successful operations
- `logger.error()` - Errors and failures
- `logger.debug()` - Detailed debugging

### Database Debugging

```sql
-- Check user's current plan and usage
SELECT 
  p.email,
  p.plan,
  p.dodo_subscription_status,
  COUNT(DISTINCT pr.id) as project_count,
  COUNT(DISTINCT e.id) as endpoint_count
FROM profiles p
LEFT JOIN projects pr ON p.id = pr.user_id
LEFT JOIN endpoints e ON pr.id = e.project_id
WHERE p.email = 'user@example.com'
GROUP BY p.id, p.email, p.plan;

-- Check recent submissions
SELECT 
  s.id,
  s.created_at,
  e.name as endpoint_name,
  s.zapier_status,
  s.google_sheets_status
FROM submissions s
JOIN endpoints e ON s.endpoint_id = e.id
WHERE e.id = 'endpoint-uuid'
ORDER BY s.created_at DESC
LIMIT 10;
```

### Common Error Patterns

**"Unauthorized" errors:**
- Check authentication in middleware
- Verify user owns the resource
- Check RLS policies

**Webhook delivery failures:**
- Verify webhook URL is accessible
- Check subscription is active
- Review payload format

**Rate limit errors:**
- Check Redis connection
- Verify rate limit configuration
- Review IP extraction logic

## Next Steps

1. Pick a feature to work on
2. Read relevant documentation
3. Set up local development environment
4. Make changes and test
5. Update documentation
6. Create pull request

## Getting Help

- Review existing documentation in dev_docs
- Check old documentation (README.md, N8N_INTEGRATION_DOCUMENTATION.md, FORM_SUBMISSION_LOGIC.md)
- Search codebase for similar patterns
- Check third-party service documentation

## Best Practices

1. **Always test with test/sandbox modes** for integrations
2. **Never commit secrets** - use environment variables
3. **Document as you code** - update dev_docs
4. **Think about security** - validate inputs, check permissions
5. **Consider scalability** - will this work at scale?
6. **Handle errors gracefully** - don't crash on external failures
7. **Log important events** - help future debugging

---

Welcome to JSONPost development! 🚀
