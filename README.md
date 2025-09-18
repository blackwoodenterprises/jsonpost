# JSONPost - Developer-Friendly Form Processing SaaS

JSONPost is a headless form backend service that allows developers to create form endpoints instantly and start collecting submissions without setting up their own backend infrastructure. Perfect for developers, founders, and freelancers who need forms fast.

## 🚀 Features

- **Instant Form Endpoints**: Create form endpoints in seconds
- **Multiple Content Types**: Support for JSON, form-data, and URL-encoded submissions
- **Email Notifications**: Get notified when forms are submitted
- **Webhook Integration**: Forward submissions to your own endpoints
- **Spam Protection**: Built-in spam filtering capabilities
- **Real-time Analytics**: Track submission metrics and trends
- **Custom Redirects**: Redirect users after successful submissions
- **Secure & Scalable**: Built with Supabase and Next.js

## 🏗️ Architecture

JSONPost is built using modern web technologies:

- **Frontend**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Backend**: Next.js API Routes with Supabase integration
- **Database**: PostgreSQL via Supabase with Row Level Security (RLS)
- **Authentication**: Supabase Auth with email/password and OAuth
- **UI Components**: Radix UI primitives with custom styling
- **Form Handling**: React Hook Form with Zod validation
- **Email Service**: Custom email service integration
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
jsonpost/
├── public/                     # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API Routes
│   │   │   └── submit/         # Form submission endpoints
│   │   │       └── [projectId]/
│   │   │           └── [endpointPath]/
│   │   │               └── route.ts
│   │   ├── auth/               # Authentication pages
│   │   │   ├── callback/       # OAuth callback
│   │   │   ├── forgot-password/
│   │   │   ├── login/
│   │   │   ├── reset-password/
│   │   │   └── signup/
│   │   ├── dashboard/          # Dashboard pages
│   │   │   ├── profile/        # User profile
│   │   │   └── projects/       # Project management
│   │   │       ├── new/        # Create new project
│   │   │       └── [id]/       # Project details
│   │   │           ├── endpoints/    # Endpoint management
│   │   │           ├── settings/     # Project settings
│   │   │           └── submissions/  # View submissions
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   ├── components/             # Reusable components
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Dashboard components
│   │   └── ui/                 # UI primitives
│   ├── lib/                    # Utility libraries
│   │   ├── email.ts            # Email service
│   │   ├── supabase.ts         # Supabase client
│   │   ├── supabase-server.ts  # Server-side Supabase
│   │   └── utils.ts            # Utility functions
│   └── middleware.ts           # Next.js middleware
├── supabase/
│   └── schema.sql              # Database schema
├── package.json                # Dependencies
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # This file
```

## 🛣️ Routes & Pages

### Public Routes
- `/` - Landing page with features and pricing
- `/auth/login` - User login page
- `/auth/signup` - User registration page
- `/auth/forgot-password` - Password reset request
- `/auth/reset-password` - Password reset form
- `/auth/callback` - OAuth callback handler

### Protected Routes (Dashboard)
- `/dashboard` - Main dashboard with project overview
- `/dashboard/profile` - User profile management
- `/dashboard/projects/new` - Create new project
- `/dashboard/projects/[id]` - Project details and overview
- `/dashboard/projects/[id]/settings` - Project settings
- `/dashboard/projects/[id]/endpoints/new` - Create new endpoint
- `/dashboard/projects/[id]/endpoints/[endpointId]` - Endpoint details
- `/dashboard/projects/[id]/endpoints/[endpointId]/edit` - Edit endpoint
- `/dashboard/projects/[id]/submissions` - All project submissions
- `/dashboard/projects/[id]/submissions/[submissionId]` - Individual submission details

## 🔌 API Endpoints

### Form Submission API
- `POST /api/submit/[projectId]/[endpointPath]` - Submit form data
- `PUT /api/submit/[projectId]/[endpointPath]` - Submit form data (alias)
- `PATCH /api/submit/[projectId]/[endpointPath]` - Submit form data (alias)
- `OPTIONS /api/submit/[projectId]/[endpointPath]` - CORS preflight

### Authentication API
- `GET /auth/callback` - Handle OAuth callbacks

### Features of Form Submission API:
- **Multiple Content Types**: Supports `application/json`, `multipart/form-data`, and `application/x-www-form-urlencoded`
- **Webhook Integration**: Forwards submissions to configured webhook URLs
- **Email Notifications**: Sends email notifications when enabled
- **Spam Protection**: Built-in spam filtering (when enabled)
- **Custom Responses**: Configurable success/error messages
- **Redirect Support**: Automatic redirects after successful submissions
- **CORS Support**: Cross-origin requests allowed

## 🖥️ Application Screens

### Landing Page
- Hero section with value proposition
- Feature highlights and benefits
- Code examples for different frameworks
- Pricing information
- Call-to-action buttons

### Authentication Screens
- **Login**: Email/password authentication with OAuth options
- **Signup**: User registration with email verification
- **Forgot Password**: Password reset request form
- **Reset Password**: New password setup form

### Dashboard Screens
- **Main Dashboard**: Project overview with quick stats
- **Profile**: User account management and settings
- **Projects List**: Overview of all user projects
- **Project Details**: Individual project dashboard with endpoints and recent submissions
- **Project Settings**: Project configuration and danger zone
- **Endpoint Management**: Create, edit, and configure form endpoints
- **Endpoint Details**: Individual endpoint analytics and settings
- **Submissions**: View and filter all form submissions
- **Submission Details**: Individual submission data and metadata

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

### Core Tables
- **profiles** - User profile information (extends auth.users)
- **projects** - User projects/workspaces
- **endpoints** - Form endpoints within projects
- **submissions** - Form submission data

### Key Features
- **Row Level Security (RLS)** - Ensures data isolation between users
- **UUID Primary Keys** - For better security and scalability
- **Automatic Timestamps** - Created/updated timestamps on all tables
- **JSONB Storage** - Flexible submission data storage
- **Indexes** - Optimized for common query patterns

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jsonpost
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql` in your Supabase SQL editor
3. Enable Row Level Security on all tables
4. Configure authentication providers if needed

### 5. Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 6. Build for Production
```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |
| `RESEND_API_KEY` | Your Resend API key for email notifications | Yes |
| `NEXT_PUBLIC_APP_URL` | Your application URL | Yes |

### Supabase Configuration
1. Enable Email Auth in Supabase Auth settings
2. Configure OAuth providers (optional)
3. Set up email templates for auth flows
4. Configure RLS policies (included in schema.sql)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The application is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

## 📊 Key Features Explained

### Form Submission Flow
1. User creates a project and endpoint
2. Endpoint generates a unique URL: `/api/submit/[projectId]/[endpointPath]`
3. Forms POST data to this URL
4. System validates endpoint and stores submission
5. Optional webhook and email notifications are sent
6. User can view submissions in dashboard

### Security Features
- Row Level Security ensures data isolation
- CORS support for cross-origin requests
- Input validation and sanitization
- Rate limiting (can be implemented)
- Spam protection capabilities

### Analytics & Monitoring
- Submission tracking and counting
- IP address and user agent logging
- Timestamp tracking for all submissions
- Project-level and endpoint-level analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples in the landing page

---

Built with ❤️ using Next.js, Supabase, and modern web technologies.
