# JSONPost Developer Documentation

## Overview

This `/dev_docs` folder contains comprehensive developer documentation for the JSONPost application. These documents are intended for developers working on the codebase and provide detailed technical information about architecture, features, integrations, and best practices.

## Documentation Index

### Core Architecture
- **[01-architecture-overview.md](01-architecture-overview.md)** - High-level system architecture, tech stack, and design patterns
- **[02-database-schema.md](02-database-schema.md)** - Complete database schema documentation with relationships
- **[03-routing-and-middleware.md](03-routing-and-middleware.md)** - Next.js routing, middleware, and rate limiting

### Authentication & Security
- **[04-authentication-and-security.md](04-authentication-and-security.md)** - Authentication flow, security best practices, and vulnerability analysis

### Core Features
- **[05-submission-endpoint.md](05-submission-endpoint.md)** - Main form submission API endpoint logic and data flow
- **[06-form-builder.md](06-form-builder.md)** - Form builder feature documentation
- **[12-autoresponder.md](12-autoresponder.md)** - Email autoresponder system

### Integrations
- **[07-google-sheets-integration.md](07-google-sheets-integration.md)** - Google Sheets OAuth and data sync
- **[08-n8n-integration.md](08-n8n-integration.md)** - n8n webhook integration (already exists as N8N_INTEGRATION_DOCUMENTATION.md)
- **[09-webhook-functionality.md](09-webhook-functionality.md)** - Svix webhooks and legacy webhook system
- **[10-dodopayments-billing.md](10-dodopayments-billing.md)** - Billing, subscriptions, and plan management
- **[11-zapier-integration.md](11-zapier-integration.md)** - Zapier webhook integration

### API Documentation
- **[13-api-routes-reference.md](13-api-routes-reference.md)** - Complete API routes documentation

### Frontend & Tools
- **[14-public-pages-and-tools.md](14-public-pages-and-tools.md)** - Public pages, tools, and utilities
- **[15-dashboard-features.md](15-dashboard-features.md)** - Dashboard pages and user interface

## Quick Reference

### Technology Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI components

**Backend:**
- Next.js API Routes
- Supabase (PostgreSQL + Auth)
- Redis (Upstash) for rate limiting

**Integrations:**
- DodoPayments (billing)
- Google Sheets API
- Zapier webhooks
- n8n webhooks
- Svix (webhook management)
- Resend (email)

### Key Database Tables

- `profiles` - User accounts and subscription data
- `projects` - User projects
- `endpoints` - Form endpoints
- `submissions` - Form submissions
- `file_uploads` - Uploaded files metadata
- `zapier_subscriptions` - Zapier webhook subscriptions
- `n8n_subscriptions` - n8n webhook subscriptions
- `monthly_submission_counts` - Usage tracking

### Main Application Routes

**Public Routes:**
- `/` - Landing page
- `/free-html-form-generator` - Form generator tool
- `/free-json-schema-builder` - JSON schema builder tool
- `/docs` - Documentation
- `/blog` - Blog

**Authentication:**
- `/auth/login` - User login
- `/auth/signup` - User registration
- `/auth/forgot-password` - Password reset

**Dashboard:**
- `/dashboard` - Main dashboard
- `/dashboard/profile` - User profile (Zapier API key)
- `/dashboard/billing` - Billing and usage
- `/dashboard/projects` - Projects list
- `/dashboard/projects/[id]` - Project details
- `/dashboard/projects/[id]/settings` - Project settings (Google Sheets, n8n)
- `/dashboard/projects/[id]/endpoints/[endpointId]` - Endpoint details
- `/dashboard/projects/[id]/endpoints/[endpointId]/edit` - Edit endpoint
- `/dashboard/projects/[id]/endpoints/[endpointId]/form-builder` - Form builder
- `/dashboard/projects/[id]/endpoints/[endpointId]/google-sheets` - Google Sheets config
- `/dashboard/projects/[id]/endpoints/[endpointId]/autoresponder` - Autoresponder config
- `/dashboard/projects/[id]/endpoints/[endpointId]/webhooks` - Webhook config

**API Routes:**
- `/api/submit/[projectId]/[endpointPath]` - Main submission endpoint
- `/api/zapier/*` - Zapier integration endpoints
- `/api/n8n/*` - n8n integration endpoints
- `/api/google-sheets/*` - Google Sheets endpoints
- `/api/webhook/dodo-payments` - DodoPayments webhooks
- `/api/svix/*` - Svix webhook management

### Environment Variables

See individual documentation files for specific environment variables required by each integration.

**Core Variables:**
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
DODO_PAYMENTS_ENVIRONMENT=
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

## Development Workflow

### Local Setup

1. Clone repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`
4. Run database migrations (schema.sql)
5. Start development server: `npm run dev`

### Code Organization

```
jsonpost/
├── src/
│   ├── app/              # Next.js app router pages and API routes
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility libraries and helpers
│   └── middleware.ts     # Next.js middleware (auth, rate limiting)
├── public/               # Static assets
├── schema.sql            # Database schema
├── form_definitions/     # Form template JSON files
└── dev_docs/            # This documentation folder
```

### Key Files

- `src/middleware.ts` - Authentication and rate limiting
- `src/lib/plans.ts` - Subscription plans configuration
- `src/lib/billing.ts` - Billing helper functions
- `src/lib/supabase.ts` - Supabase client initialization
- `src/lib/email.ts` - Email sending utilities
- `src/lib/autoresponder.ts` - Autoresponder email logic

## Common Tasks

### Adding a New Plan

1. Update `src/lib/plans.ts` with new plan details
2. Add DodoPayments product IDs to environment variables
3. Update webhook handler in `/api/webhook/dodo-payments/route.ts`
4. Update billing page UI to display new plan

### Adding a New Integration

1. Create API routes in `/api/{integration-name}/`
2. Add authentication mechanism (API key or OAuth)
3. Update middleware.ts if needed (public routes)
4. Add database fields to store integration data
5. Add UI in dashboard for configuration
6. Integrate into submission endpoint if needed
7. Document in dev_docs

### Modifying Submission Logic

Main file: `src/app/api/submit/[projectId]/[endpointPath]/route.ts`

Order of operations:
1. CORS validation
2. Authentication
3. Request parsing
4. JSON schema validation
5. Database storage
6. File uploads
7. Notifications (webhooks, emails, etc.)

## Testing

### Manual Testing Checklist

- [ ] Form submission (JSON, FormData, multipart)
- [ ] File uploads
- [ ] Email notifications
- [ ] Webhook deliveries (Zapier, n8n, Svix)
- [ ] Google Sheets integration
- [ ] Autoresponder emails
- [ ] Rate limiting
- [ ] Authentication flows
- [ ] Billing checkout and webhooks
- [ ] Plan limit enforcement

### API Testing

Use tools like:
- Postman / Insomnia for API testing
- cURL for command-line testing
- Zapier/n8n test webhooks
- DodoPayments test mode

## Security Considerations

### Critical Security Points

1. **Row Level Security (RLS)**: Ensure all Supabase queries respect RLS policies
2. **API Key Security**: Store securely, never expose in client code
3. **Rate Limiting**: Applied to submission endpoints
4. **Input Validation**: Validate all user inputs
5. **File Upload Security**: Validate file types and sizes
6. **CORS Configuration**: Properly configure allowed domains
7. **Authentication**: Always verify user ownership of resources

### Known Security Considerations

- Webhook signatures: Consider adding HMAC signatures for Zapier/n8n webhooks
- API key storage: Consider hashing API keys in database
- File scanning: Consider adding virus scanning for file uploads
- Rate limiting: Extend to other endpoints beyond submission
- Token refresh: Implement better error handling for expired tokens

## Troubleshooting

### Common Issues

**Webhook Not Receiving Data:**
- Check subscription is active in database
- Verify webhook URL is accessible
- Check firewall/network settings
- Review application logs

**Authentication Failures:**
- Verify API key is correct
- Check token expiration for OAuth integrations
- Ensure user has proper permissions

**Database Connection Issues:**
- Verify Supabase credentials
- Check RLS policies
- Review service role key usage

**Rate Limiting:**
- Check Redis connection
- Review rate limit configuration in middleware
- Verify IP extraction logic

## Contributing

When adding new features:

1. Update relevant documentation in dev_docs
2. Add environment variables to .env.example
3. Update database schema if needed
4. Add appropriate error handling and logging
5. Test thoroughly in development
6. Consider security implications
7. Update this README if adding new major features

## Support Resources

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- DodoPayments Docs: https://docs.dodopayments.com
- Google Sheets API: https://developers.google.com/sheets/api
- Svix Docs: https://docs.svix.com

## Version History

- **v1.0** (2025-01-05): Initial comprehensive documentation created
- Covers all major features and integrations as of January 2025
- Based on Next.js 15, React 19, Supabase

---

**Note**: This documentation is a living document. Please keep it updated as the application evolves.
