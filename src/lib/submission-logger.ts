import { createClient } from '@supabase/supabase-js';

// Create a service role client for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export type LogLevel = 'INFO' | 'SUCCESS' | 'ERROR' | 'WARNING' | 'DEBUG';

// Define a more specific type for log data
type LogData = string | number | boolean | object | null | undefined | Error | unknown;

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: LogData;
}

export class SubmissionLogger {
  private logs: LogEntry[] = [];
  private submissionId: string;

  constructor(submissionId: string) {
    this.submissionId = submissionId;
    this.log('INFO', 'Form submission logging started', { submissionId });
  }

  // Method to update submission ID after it's created
  updateSubmissionId(newSubmissionId: string) {
    this.submissionId = newSubmissionId;
    this.log('INFO', 'Submission ID updated', { newSubmissionId });
  }

  log(level: LogLevel, message: string, data?: LogData): void {
    const timestamp = new Date().toISOString();
    this.logs.push({
      timestamp,
      level,
      message,
      data: data ? this.sanitizeData(data) : undefined
    });
  }

  info(message: string, data?: LogData): void {
    this.log('INFO', message, data);
  }

  success(message: string, data?: LogData): void {
    this.log('SUCCESS', message, data);
  }

  error(message: string, data?: LogData): void {
    this.log('ERROR', message, data);
  }

  warning(message: string, data?: LogData): void {
    this.log('WARNING', message, data);
  }

  debug(message: string, data?: LogData): void {
    this.log('DEBUG', message, data);
  }

  private sanitizeData(data: LogData): string {
    if (!data) return String(data);
    
    // Convert to string if it's not already
    let dataStr = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    
    // Hide API keys and sensitive information
    const sensitivePatterns = [
      /("api_key":\s*")[^"]*(")/gi,
      /("password":\s*")[^"]*(")/gi,
      /("token":\s*")[^"]*(")/gi,
      /("secret":\s*")[^"]*(")/gi,
      /("authorization":\s*")[^"]*(")/gi,
      /(Bearer\s+)[^\s]*/gi,
      /(api_key=)[^&\s]*/gi,
    ];

    sensitivePatterns.forEach(pattern => {
      dataStr = dataStr.replace(pattern, (match, p1, p2) => {
        if (p1 && p2) {
          return `${p1}***HIDDEN***${p2}`;
        }
        return match.replace(/[^\s=:]+$/, '***HIDDEN***');
      });
    });

    return dataStr;
  }

  private getColorForLevel(level: LogLevel): string {
    const colors = {
      INFO: '#3b82f6',      // Blue
      SUCCESS: '#10b981',   // Green
      ERROR: '#ef4444',     // Red
      WARNING: '#f59e0b',   // Yellow
      DEBUG: '#8b5cf6'      // Purple
    };
    return colors[level];
  }

  private generateHtml(): string {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Submission Log - ${this.submissionId}</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 20px;
            line-height: 1.4;
        }
        .log-container {
            max-width: 100%;
            overflow-x: auto;
        }
        .log-entry {
            margin-bottom: 15px;
            padding: 10px;
            border-left: 3px solid;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
        }
        .log-header {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .timestamp {
            color: #888;
            font-size: 0.9em;
        }
        .level {
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 3px;
            margin: 0 5px;
        }
        .message {
            margin: 5px 0;
        }
        .data {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 3px;
            margin-top: 5px;
            white-space: pre-wrap;
            font-size: 0.9em;
            overflow-x: auto;
        }
        .level-INFO { background-color: #3b82f6; color: white; }
        .level-SUCCESS { background-color: #10b981; color: white; }
        .level-ERROR { background-color: #ef4444; color: white; }
        .level-WARNING { background-color: #f59e0b; color: white; }
        .level-DEBUG { background-color: #8b5cf6; color: white; }
        
        .entry-INFO { border-left-color: #3b82f6; }
        .entry-SUCCESS { border-left-color: #10b981; }
        .entry-ERROR { border-left-color: #ef4444; }
        .entry-WARNING { border-left-color: #f59e0b; }
        .entry-DEBUG { border-left-color: #8b5cf6; }
    </style>
</head>
<body>
    <div class="log-container">
        <h1 style="color: #fff; margin-bottom: 30px;">Form Submission Log</h1>
        <p style="color: #888; margin-bottom: 30px;">Submission ID: ${this.submissionId}</p>
        
        ${this.logs.map(log => `
        <div class="log-entry entry-${log.level}">
            <div class="log-header">
                <span class="timestamp">${log.timestamp}</span>
                <span class="level level-${log.level}">${log.level}</span>
            </div>
            <div class="message">${this.escapeHtml(log.message)}</div>
            ${log.data ? `<div class="data">${this.escapeHtml(String(log.data))}</div>` : ''}
        </div>
        `).join('')}
    </div>
</body>
</html>`;
    
    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async uploadToStorage(): Promise<{ success: boolean; error?: string; filePath?: string }> {
    try {
      console.log('🔍 Starting log upload process for submission:', this.submissionId)
      console.log('📊 Number of log entries:', this.logs.length)
      
      const html = this.generateHtmlString();
      console.log('📄 Generated HTML length:', html.length)
      
      const fileName = `${this.submissionId}.html`;
      const filePath = `${fileName}`;
      
      console.log('📁 Uploading to bucket: submission_logs')
      console.log('📂 File path:', filePath)
      console.log('🔑 Using service role key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Present' : 'Missing')
      console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('submission_logs')
        .upload(filePath, html, {
          contentType: 'text/html',
          upsert: true
        });

      console.log('📤 Upload response data:', data)
      console.log('❌ Upload error:', error)

      if (error) {
        console.error('💥 Storage upload failed:', error.message)
        this.error('Failed to upload log file to storage', { error: error.message });
        return { success: false, error: error.message };
      }

      console.log('✅ Upload successful, file path:', data?.path)
      this.success('Log file uploaded to storage successfully', { filePath });
      return { success: true, filePath };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('💥 Exception during upload:', errorMessage)
      console.error('🔍 Full error object:', error)
      this.error('Exception occurred while uploading log file', { error: errorMessage });
      return { success: false, error: errorMessage };
    }
  }

  // Method to get logs as plain text for server-side HTML generation
  generateHtmlString(): string {
    const escapeHtml = (text: string): string => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
        // Removed quote escaping to make JSON more readable
    };

    const formatData = (data: string): string => {
      // Try to parse and pretty-format JSON data
      try {
        const parsed = JSON.parse(data);
        return JSON.stringify(parsed, null, 2);
      } catch {
        // If not JSON, return as-is
        return data;
      }
    };

    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Submission Log - ${this.submissionId}</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: #000;
            color: #fff;
            margin: 0;
            padding: 20px;
            line-height: 1.4;
        }
        .log-container {
            max-width: 100%;
            overflow-x: auto;
        }
        .log-entry {
            margin-bottom: 15px;
            padding: 10px;
            border-left: 3px solid;
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 3px;
        }
        .log-header {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .timestamp {
            color: #888;
            font-size: 0.9em;
        }
        .level {
            font-weight: bold;
            padding: 2px 6px;
            border-radius: 3px;
            margin: 0 5px;
        }
        .message {
            margin: 5px 0;
        }
        .data {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 10px;
            border-radius: 3px;
            margin-top: 5px;
            white-space: pre-wrap;
            font-size: 0.9em;
            overflow-x: auto;
        }
        .level-INFO { background-color: #3b82f6; color: white; }
        .level-SUCCESS { background-color: #10b981; color: white; }
        .level-ERROR { background-color: #ef4444; color: white; }
        .level-WARNING { background-color: #f59e0b; color: white; }
        .level-DEBUG { background-color: #8b5cf6; color: white; }
        
        .entry-INFO { border-left-color: #3b82f6; }
        .entry-SUCCESS { border-left-color: #10b981; }
        .entry-ERROR { border-left-color: #ef4444; }
        .entry-WARNING { border-left-color: #f59e0b; }
        .entry-DEBUG { border-left-color: #8b5cf6; }
    </style>
</head>
<body>
    <div class="log-container">
        <h1 style="color: #fff; margin-bottom: 30px;">Form Submission Log</h1>
        <p style="color: #888; margin-bottom: 30px;">Submission ID: ${this.submissionId}</p>
        
        ${this.logs.map(log => `
        <div class="log-entry entry-${log.level}">
            <div class="log-header">
                <span class="timestamp">${log.timestamp}</span>
                <span class="level level-${log.level}">${log.level}</span>
            </div>
            <div class="message">${escapeHtml(log.message)}</div>
            ${log.data ? `<div class="data">${escapeHtml(formatData(String(log.data)))}</div>` : ''}
        </div>
        `).join('')}
    </div>
</body>
</html>`;
    
    return html;
  }
}