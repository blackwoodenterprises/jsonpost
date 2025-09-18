// Email service for sending notifications
// This is a placeholder implementation that can be extended with actual email providers

interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

interface SubmissionEmailData {
  endpointName: string
  projectName: string
  submissionData: Record<string, unknown>
  submissionId: string
  submittedAt: string
  ipAddress: string
}

export class EmailService {
  private static instance: EmailService
  
  private constructor() {}
  
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  async sendSubmissionNotification(
    userEmail: string,
    data: SubmissionEmailData
  ): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: userEmail,
        subject: `New submission for ${data.endpointName}`,
        html: this.generateSubmissionEmailHTML(data),
        text: this.generateSubmissionEmailText(data)
      }

      // TODO: Implement actual email sending
      // This could use services like:
      // - Resend (recommended for Next.js)
      // - SendGrid
      // - AWS SES
      // - Nodemailer with SMTP
      
      console.log('Email would be sent:', emailData)
      
      // For now, just log the email content
      // In production, replace this with actual email service
      return await this.mockSendEmail()
      
    } catch (error) {
      console.error('Failed to send email notification:', error)
      return false
    }
  }

  private generateSubmissionEmailHTML(data: SubmissionEmailData): string {
    const formattedData = Object.entries(data.submissionData)
      .map(([key, value]) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${key}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>
      `).join('')

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb;">New Form Submission</h2>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Endpoint:</strong> ${data.endpointName}</p>
              <p><strong>Project:</strong> ${data.projectName}</p>
              <p><strong>Submitted:</strong> ${data.submittedAt}</p>
              <p><strong>IP Address:</strong> ${data.ipAddress}</p>
              <p><strong>Submission ID:</strong> ${data.submissionId}</p>
            </div>

            <h3>Submission Data:</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              ${formattedData}
            </table>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
              <p>This notification was sent by JSONPost. You can manage your notification settings in your dashboard.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  private generateSubmissionEmailText(data: SubmissionEmailData): string {
    const formattedData = Object.entries(data.submissionData)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n')

    return `
New Form Submission

Endpoint: ${data.endpointName}
Project: ${data.projectName}
Submitted: ${data.submittedAt}
IP Address: ${data.ipAddress}
Submission ID: ${data.submissionId}

Submission Data:
${formattedData}

---
This notification was sent by JSONPost.
    `.trim()
  }

  private async mockSendEmail(): Promise<boolean> {
    // Mock implementation - replace with actual email service
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Mock email sent successfully')
        resolve(true)
      }, 100)
    })
  }

  // Example implementation with Resend (uncomment and configure when ready)
  /*
  private async sendWithResend(emailData: EmailData): Promise<boolean> {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { data, error } = await resend.emails.send({
        from: 'JSONPost <notifications@yourdomain.com>',
        to: [emailData.to],
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text
      })

      if (error) {
        console.error('Resend error:', error)
        return false
      }

      console.log('Email sent successfully:', data)
      return true
    } catch (error) {
      console.error('Failed to send email with Resend:', error)
      return false
    }
  }
  */
}

export const emailService = EmailService.getInstance()