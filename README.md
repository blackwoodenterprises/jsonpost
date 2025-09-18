# JSONPost

A modern form backend service that allows you to collect form submissions without writing backend code. Built with Next.js, Supabase, and TypeScript.

## Features

- 🚀 **Easy Setup**: Create form endpoints in minutes
- 📊 **Dashboard**: Manage projects and view submissions
- 🔔 **Notifications**: Email alerts and webhook integrations
- 🔒 **Secure**: Built-in authentication and data protection
- 📱 **Responsive**: Works on all devices
- 🎨 **Modern UI**: Clean and intuitive interface

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd jsonpost
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase dashboard
   - Run the SQL from `supabase/schema.sql` in the SQL editor

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### Creating a Form Endpoint

1. Sign up and log in to your dashboard
2. Create a new project
3. Add an endpoint to your project
4. Configure notifications and response messages
5. Use the generated endpoint URL in your forms

### Example HTML Form

```html
<form action="https://yourapp.com/api/submit/project-id/endpoint-path" method="POST">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### JavaScript/Fetch Example

```javascript
const formData = {
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Hello from JSONPost!'
}

fetch('https://yourapp.com/api/submit/project-id/endpoint-path', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error))
```

## API Reference

### Submit Form Data

**Endpoint:** `POST /api/submit/[projectId]/[endpointPath]`

**Content Types Supported:**
- `application/json`
- `application/x-www-form-urlencoded`
- `multipart/form-data`

**Response:**
```json
{
  "success": true,
  "message": "Submission received successfully",
  "submission_id": "uuid"
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

## Features in Detail

### Projects
- Organize your form endpoints into projects
- Each project can have multiple endpoints
- Project-level settings and analytics

### Endpoints
- Custom paths and HTTP methods
- Configurable response messages
- Email notifications
- Webhook integrations
- Redirect URLs after submission

### Notifications
- **Email Alerts**: Get notified when forms are submitted
- **Webhooks**: Send data to external services
- **Real-time Dashboard**: View submissions as they come in

### Security
- User authentication required
- Row Level Security (RLS) in database
- CORS support for cross-origin requests
- IP address logging for submissions

## Database Schema

The application uses the following main tables:

- `profiles`: User profiles linked to Supabase auth
- `projects`: User projects for organizing endpoints
- `endpoints`: Form endpoints with configuration
- `submissions`: Form submission data

See `supabase/schema.sql` for the complete schema.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `RESEND_API_KEY` | Resend API key for emails | No |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Email Integration

The application includes a flexible email service that can be configured with various providers:

### Supported Providers (with configuration)
- Resend (recommended)
- SendGrid
- AWS SES
- Nodemailer with SMTP

To enable email notifications:
1. Choose an email provider
2. Add your API key to environment variables
3. Update the email service configuration
4. Enable notifications in your endpoint settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

- 📧 Email: support@jsonpost.com
- 💬 Discord: [Join our community](https://discord.gg/jsonpost)
- 📖 Documentation: [docs.jsonpost.com](https://docs.jsonpost.com)

## Roadmap

- [ ] File upload support
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] API rate limiting
- [ ] Custom domains
- [ ] Zapier integration
- [ ] Form builder UI
- [ ] Spam protection
