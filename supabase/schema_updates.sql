-- Schema updates for multiple emails and webhooks with logging
-- Run these SQL commands in your Supabase SQL editor

-- 1. Create endpoint_emails table for multiple email addresses per endpoint
CREATE TABLE endpoint_emails (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  endpoint_id UUID REFERENCES endpoints(id) ON DELETE CASCADE NOT NULL,
  email_address TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create endpoint_webhooks table for multiple webhook URLs per endpoint
CREATE TABLE endpoint_webhooks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  endpoint_id UUID REFERENCES endpoints(id) ON DELETE CASCADE NOT NULL,
  webhook_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create email_logs table for tracking email deliveries
CREATE TABLE email_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE NOT NULL,
  endpoint_email_id UUID REFERENCES endpoint_emails(id) ON DELETE SET NULL,
  recipient_email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'pending')),
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create webhook_logs table for tracking webhook deliveries
CREATE TABLE webhook_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE NOT NULL,
  endpoint_webhook_id UUID REFERENCES endpoint_webhooks(id) ON DELETE SET NULL,
  webhook_url TEXT NOT NULL,
  status_code INTEGER,
  response_body TEXT,
  error_message TEXT,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'pending')),
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create indexes for better performance
CREATE INDEX idx_endpoint_emails_endpoint_id ON endpoint_emails(endpoint_id);
CREATE INDEX idx_endpoint_emails_active ON endpoint_emails(endpoint_id, is_active);
CREATE INDEX idx_endpoint_webhooks_endpoint_id ON endpoint_webhooks(endpoint_id);
CREATE INDEX idx_endpoint_webhooks_active ON endpoint_webhooks(endpoint_id, is_active);
CREATE INDEX idx_email_logs_submission_id ON email_logs(submission_id);
CREATE INDEX idx_email_logs_endpoint_email_id ON email_logs(endpoint_email_id);
CREATE INDEX idx_webhook_logs_submission_id ON webhook_logs(submission_id);
CREATE INDEX idx_webhook_logs_endpoint_webhook_id ON webhook_logs(endpoint_webhook_id);

-- 6. Add updated_at triggers for new tables
CREATE TRIGGER update_endpoint_emails_updated_at BEFORE UPDATE ON endpoint_emails
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_endpoint_webhooks_updated_at BEFORE UPDATE ON endpoint_webhooks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. Enable RLS on new tables
ALTER TABLE endpoint_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE endpoint_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- 8. Create RLS policies for endpoint_emails
CREATE POLICY "Users can view emails of own endpoints" ON endpoint_emails
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_emails.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create emails for own endpoints" ON endpoint_emails
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_emails.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update emails of own endpoints" ON endpoint_emails
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_emails.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete emails of own endpoints" ON endpoint_emails
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_emails.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

-- 9. Create RLS policies for endpoint_webhooks
CREATE POLICY "Users can view webhooks of own endpoints" ON endpoint_webhooks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_webhooks.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create webhooks for own endpoints" ON endpoint_webhooks
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_webhooks.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update webhooks of own endpoints" ON endpoint_webhooks
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_webhooks.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete webhooks of own endpoints" ON endpoint_webhooks
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = endpoint_webhooks.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

-- 10. Create RLS policies for email_logs
CREATE POLICY "Users can view email logs of own submissions" ON email_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM submissions 
      JOIN endpoints ON endpoints.id = submissions.endpoint_id
      JOIN projects ON projects.id = endpoints.project_id
      WHERE submissions.id = email_logs.submission_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert email logs" ON email_logs
  FOR INSERT WITH CHECK (true);

-- 11. Create RLS policies for webhook_logs
CREATE POLICY "Users can view webhook logs of own submissions" ON webhook_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM submissions 
      JOIN endpoints ON endpoints.id = submissions.endpoint_id
      JOIN projects ON projects.id = endpoints.project_id
      WHERE submissions.id = webhook_logs.submission_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "System can insert webhook logs" ON webhook_logs
  FOR INSERT WITH CHECK (true);

-- 12. Migration script to move existing data (optional - run if you have existing data)
-- This will migrate existing single email/webhook configurations to the new tables

-- Migrate existing email notifications (if email_notifications is true, add user's email)
INSERT INTO endpoint_emails (endpoint_id, email_address, is_active)
SELECT 
  e.id as endpoint_id,
  p.email as email_address,
  true as is_active
FROM endpoints e
JOIN projects pr ON pr.id = e.project_id
JOIN profiles p ON p.id = pr.user_id
WHERE e.email_notifications = true
ON CONFLICT DO NOTHING;

-- Migrate existing webhook URLs
INSERT INTO endpoint_webhooks (endpoint_id, webhook_url, is_active)
SELECT 
  id as endpoint_id,
  webhook_url,
  true as is_active
FROM endpoints 
WHERE webhook_url IS NOT NULL AND webhook_url != ''
ON CONFLICT DO NOTHING;

-- 13. Add columns to track if endpoint uses new system (optional - for gradual migration)
ALTER TABLE endpoints ADD COLUMN uses_multiple_emails BOOLEAN DEFAULT false;
ALTER TABLE endpoints ADD COLUMN uses_multiple_webhooks BOOLEAN DEFAULT false;

-- Update existing endpoints to use new system if they have migrated data
UPDATE endpoints SET uses_multiple_emails = true 
WHERE id IN (SELECT DISTINCT endpoint_id FROM endpoint_emails);

UPDATE endpoints SET uses_multiple_webhooks = true 
WHERE id IN (SELECT DISTINCT endpoint_id FROM endpoint_webhooks);