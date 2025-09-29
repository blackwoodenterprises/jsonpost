import { Database } from '@/lib/database.types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface AutoresponderConfig {
  enabled: boolean;
  provider: string;
  fromEmail: string;
  fromName?: string;
  subject: string;
  htmlTemplate?: string;
  textTemplate?: string;
  recipientField: string;
  apiKey?: string;
  domain?: string;
}

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
  fromEmail: string;
  fromName?: string;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class AutoresponderService {
  private config: AutoresponderConfig;

  constructor(config: AutoresponderConfig) {
    this.config = config;
  }

  /**
   * Process template variables by replacing {{variable}} placeholders with actual values
   */
  private processTemplate(template: string, data: Record<string, unknown>): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (match, variable) => {
      const value = this.getNestedValue(data, variable.trim());
      return value !== undefined && value !== null ? String(value) : match;
    });
  }

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: Record<string, unknown>, path: string): unknown {
    return path.split('.').reduce((current: unknown, key: string) => {
      if (current && typeof current === 'object' && key in current) {
        return (current as Record<string, unknown>)[key];
      }
      return undefined;
    }, obj as unknown);
  }

  /**
   * Extract recipient email from submission data
   */
  private extractRecipientEmail(data: Record<string, unknown>): string | null {
    const email = this.getNestedValue(data, this.config.recipientField);
    if (typeof email === 'string' && email.includes('@')) {
      return email;
    }
    return null;
  }

  /**
   * Send email using JSONPost built-in service (via Resend)
   */
  private async sendWithJsonPost(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      // Use Resend directly for JSONPost built-in service with hardcoded sender
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'JSONPost Agent <no-reply@jsonpost.com>',
          to: [params.to],
          subject: params.subject,
          html: params.htmlContent,
          text: params.textContent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          messageId: result.id,
        };
      } else {
        const error = await response.text();
        return {
          success: false,
          error: `JSONPost email failed: ${error}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `JSONPost email error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Send email using SendGrid
   */
  private async sendWithSendGrid(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{
            to: [{ email: params.to }],
            subject: params.subject,
          }],
          from: {
            email: params.fromEmail,
            name: params.fromName,
          },
          content: [
            ...(params.textContent ? [{ type: 'text/plain', value: params.textContent }] : []),
            ...(params.htmlContent ? [{ type: 'text/html', value: params.htmlContent }] : []),
          ],
        }),
      });

      if (response.ok) {
        const messageId = response.headers.get('x-message-id') || 'sendgrid-' + Date.now();
        return {
          success: true,
          messageId,
        };
      } else {
        const error = await response.text();
        return {
          success: false,
          error: `SendGrid error: ${error}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `SendGrid error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Send email using Resend
   */
  private async sendWithResend(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: params.fromName ? `${params.fromName} <${params.fromEmail}>` : params.fromEmail,
          to: [params.to],
          subject: params.subject,
          html: params.htmlContent,
          text: params.textContent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          messageId: result.id,
        };
      } else {
        const error = await response.text();
        return {
          success: false,
          error: `Resend error: ${error}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Resend error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Send email using Postmark
   */
  private async sendWithPostmark(params: SendEmailParams): Promise<SendEmailResult> {
    try {
      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          'X-Postmark-Server-Token': this.config.apiKey!,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          From: params.fromName ? `${params.fromName} <${params.fromEmail}>` : params.fromEmail,
          To: params.to,
          Subject: params.subject,
          HtmlBody: params.htmlContent,
          TextBody: params.textContent,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          messageId: result.MessageID,
        };
      } else {
        const error = await response.text();
        return {
          success: false,
          error: `Postmark error: ${error}`,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: `Postmark error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Send autoresponder email
   */
  async sendAutoresponder(
    submissionData: Record<string, unknown>,
    submissionId: string,
    endpointId: string
  ): Promise<{ success: boolean; error?: string; logId?: string }> {
    try {
      // Extract recipient email
      const recipientEmail = this.extractRecipientEmail(submissionData);
      if (!recipientEmail) {
        return {
          success: false,
          error: `No valid email found in field '${this.config.recipientField}'`,
        };
      }

      // Process templates
      const processedSubject = this.processTemplate(this.config.subject, submissionData);
      const processedHtmlContent = this.config.htmlTemplate 
        ? this.processTemplate(this.config.htmlTemplate, submissionData)
        : undefined;
      const processedTextContent = this.config.textTemplate
        ? this.processTemplate(this.config.textTemplate, submissionData)
        : undefined;

      // Send email based on provider
      let result: SendEmailResult;
      switch (this.config.provider) {
        case 'sendgrid':
          result = await this.sendWithSendGrid({
            to: recipientEmail,
            subject: processedSubject,
            htmlContent: processedHtmlContent,
            textContent: processedTextContent,
            fromEmail: this.config.fromEmail,
            fromName: this.config.fromName,
          });
          break;
        case 'resend':
          result = await this.sendWithResend({
            to: recipientEmail,
            subject: processedSubject,
            htmlContent: processedHtmlContent,
            textContent: processedTextContent,
            fromEmail: this.config.fromEmail,
            fromName: this.config.fromName,
          });
          break;
        case 'postmark':
          result = await this.sendWithPostmark({
            to: recipientEmail,
            subject: processedSubject,
            htmlContent: processedHtmlContent,
            textContent: processedTextContent,
            fromEmail: this.config.fromEmail,
            fromName: this.config.fromName,
          });
          break;
        case 'jsonpost':
        default:
          result = await this.sendWithJsonPost({
            to: recipientEmail,
            subject: processedSubject,
            htmlContent: processedHtmlContent,
            textContent: processedTextContent,
            fromEmail: this.config.fromEmail,
            fromName: this.config.fromName,
          });
          break;
      }

      // Log the result
      const { data: logEntry, error: logError } = await supabase
        .from('autoresponder_logs')
        .insert({
          submission_id: submissionId,
          endpoint_id: endpointId,
          recipient_email: recipientEmail,
          provider: this.config.provider,
          status: result.success ? 'sent' : 'failed',
          provider_message_id: result.messageId,
          error_message: result.error,
          sent_at: result.success ? new Date().toISOString() : null,
        })
        .select('id')
        .single();

      if (logError) {
        console.error('Failed to log autoresponder result:', logError);
      }

      return {
        success: result.success,
        error: result.error,
        logId: logEntry?.id,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      // Log the error
      try {
        await supabase
          .from('autoresponder_logs')
          .insert({
            submission_id: submissionId,
            endpoint_id: endpointId,
            recipient_email: 'unknown',
            provider: this.config.provider,
            status: 'failed',
            error_message: errorMessage,
          });
      } catch (logError) {
        console.error('Failed to log autoresponder error:', logError);
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

/**
 * Create autoresponder service from endpoint configuration
 */
export function createAutoresponderService(
  endpoint: Database['public']['Tables']['endpoints']['Row']
): AutoresponderService | null {
  if (!endpoint.autoresponder_enabled) {
    return null;
  }

  const config: AutoresponderConfig = {
    enabled: endpoint.autoresponder_enabled,
    provider: endpoint.autoresponder_provider || 'jsonpost',
    fromEmail: endpoint.autoresponder_provider === 'jsonpost' 
      ? 'no-reply@jsonpost.com' 
      : (endpoint.autoresponder_from_email || ''),
    fromName: endpoint.autoresponder_provider === 'jsonpost' 
      ? 'JSONPost Agent' 
      : (endpoint.autoresponder_from_name || undefined),
    subject: endpoint.autoresponder_subject || '',
    htmlTemplate: endpoint.autoresponder_html_template || undefined,
    textTemplate: endpoint.autoresponder_text_template || undefined,
    recipientField: endpoint.autoresponder_recipient_field || '',
    apiKey: endpoint.autoresponder_provider === 'jsonpost' 
      ? process.env.RESEND_API_KEY 
      : (endpoint.autoresponder_api_key || undefined),
    domain: endpoint.autoresponder_domain || undefined,
  };

  // Validate required fields
  if (!config.subject || !config.recipientField) {
    console.error('Autoresponder configuration incomplete:', {
      hasSubject: !!config.subject,
      hasRecipientField: !!config.recipientField,
    });
    return null;
  }

  // For non-JSONPost providers, validate fromEmail and apiKey
  if (config.provider !== 'jsonpost') {
    if (!config.fromEmail || !config.apiKey) {
      console.error('Autoresponder configuration incomplete for external provider:', {
        provider: config.provider,
        hasFromEmail: !!config.fromEmail,
        hasApiKey: !!config.apiKey,
      });
      return null;
    }
  }

  return new AutoresponderService(config);
}