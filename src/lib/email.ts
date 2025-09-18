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

      // Use Resend for email sending
      return await this.sendWithResend(emailData)
      
    } catch (error) {
      console.error('Failed to send email notification:', error)
      return false
    }
  }

  private generateSubmissionEmailHTML(data: SubmissionEmailData): string {
    const prettyJsonData = JSON.stringify(data.submissionData, null, 2)

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Form Submission - JSONPost</title>
          <!--[if mso]>
          <noscript>
            <xml>
              <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          </noscript>
          <![endif]-->
          <style>
            @media only screen and (max-width: 600px) {
              .container { width: 100% !important; padding: 10px !important; }
              .header { padding: 20px 15px !important; }
              .content { padding: 20px 15px !important; }
              .info-grid { display: block !important; }
              .info-item { margin-bottom: 12px !important; }
              .json-container { font-size: 12px !important; }
            }
            @media (prefers-color-scheme: dark) {
              .dark-mode { background-color: #1a1a1a !important; color: #ffffff !important; }
              .dark-card { background-color: #2d2d2d !important; }
              .dark-border { border-color: #404040 !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f8fafc;">
          <div class="container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); border-radius: 12px; overflow: hidden;">
            
            <!-- Header -->
            <div class="header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 12px; border-radius: 50%; margin-bottom: 16px;">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Form Submission</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 400;">You've received a new submission on JSONPost</p>
            </div>

            <!-- Content -->
            <div class="content" style="padding: 40px;">
              
              <!-- Submission Info Card -->
              <div style="background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; padding: 24px; margin-bottom: 32px; border-left: 4px solid #667eea;">
                <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <span style="display: inline-block; width: 8px; height: 8px; background-color: #10b981; border-radius: 50%; margin-right: 12px;"></span>
                  Submission Details
                </h2>
                
                <div class="info-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="info-item">
                    <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Endpoint</div>
                    <div style="font-size: 16px; font-weight: 600; color: #1e293b;">${data.endpointName}</div>
                  </div>
                  <div class="info-item">
                    <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Project</div>
                    <div style="font-size: 16px; font-weight: 600; color: #1e293b;">${data.projectName}</div>
                  </div>
                  <div class="info-item">
                    <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Submitted At</div>
                    <div style="font-size: 14px; color: #475569;">${data.submittedAt}</div>
                  </div>
                  <div class="info-item">
                    <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">IP Address</div>
                    <div style="font-size: 14px; color: #475569; font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;">${data.ipAddress}</div>
                  </div>
                </div>
                
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #cbd5e1;">
                  <div style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Submission ID</div>
                  <div style="font-size: 14px; color: #475569; font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; background-color: #f1f5f9; padding: 8px 12px; border-radius: 6px; display: inline-block;">${data.submissionId}</div>
                </div>
              </div>

              <!-- Submission Data -->
              <div style="margin-bottom: 32px;">
                <h2 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="14,2 14,8 20,8" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Submission Data
                </h2>
                
                <div class="json-container" style="background: #0f172a; border-radius: 12px; padding: 24px; border: 1px solid #334155; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: 16px; right: 16px; background: rgba(100, 116, 139, 0.2); color: #94a3b8; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">JSON</div>
                  <pre style="margin: 0; font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; font-size: 14px; line-height: 1.6; color: #e2e8f0; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">${prettyJsonData}</pre>
                </div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin-bottom: 32px;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://jsonpost.dev'}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4); transition: all 0.2s ease;">
                  View in Dashboard →
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0; text-align: center;">
              <div style="margin-bottom: 16px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity: 0.6;">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#64748b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">JSONPost</p>
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">This notification was sent automatically. You can manage your notification settings in your dashboard.</p>
            </div>

          </div>
        </body>
      </html>
    `
  }

  private generateSubmissionEmailText(data: SubmissionEmailData): string {
    const prettyJsonData = JSON.stringify(data.submissionData, null, 2)

    return `
New Form Submission

Endpoint: ${data.endpointName}
Project: ${data.projectName}
Submitted: ${data.submittedAt}
IP Address: ${data.ipAddress}
Submission ID: ${data.submissionId}

Submission Data:
${prettyJsonData}

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

  // Resend implementation for sending emails
  private async sendWithResend(emailData: EmailData): Promise<boolean> {
    try {
      const { Resend } = await import('resend')
      
      if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY environment variable is not set')
        return false
      }
      
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { data, error } = await resend.emails.send({
        from: 'JSONPost <notifications@jsonpost.com>',
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
}

export const emailService = EmailService.getInstance()