-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.email_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  submission_id uuid NOT NULL,
  endpoint_email_id uuid,
  recipient_email text NOT NULL,
  status text NOT NULL CHECK (status = ANY (ARRAY['sent'::text, 'failed'::text, 'pending'::text])),
  error_message text,
  sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT email_logs_pkey PRIMARY KEY (id),
  CONSTRAINT email_logs_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submissions(id),
  CONSTRAINT email_logs_endpoint_email_id_fkey FOREIGN KEY (endpoint_email_id) REFERENCES public.endpoint_emails(id)
);
CREATE TABLE public.endpoint_emails (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  endpoint_id uuid NOT NULL,
  email_address text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT endpoint_emails_pkey PRIMARY KEY (id),
  CONSTRAINT endpoint_emails_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoints(id)
);
CREATE TABLE public.endpoint_webhooks (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  endpoint_id uuid NOT NULL,
  webhook_url text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT endpoint_webhooks_pkey PRIMARY KEY (id),
  CONSTRAINT endpoint_webhooks_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoints(id)
);
CREATE TABLE public.endpoints (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  project_id uuid NOT NULL,
  endpoint_key text NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'::text) UNIQUE,
  method text NOT NULL DEFAULT 'POST'::text,
  path text NOT NULL,
  allowed_domains ARRAY,
  email_notifications boolean DEFAULT false,
  webhook_url text,
  redirect_url text,
  success_message text DEFAULT 'Thank you for your submission!'::text,
  error_message text DEFAULT 'There was an error processing your submission.'::text,
  store_submissions boolean DEFAULT true,
  spam_protection boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  uses_multiple_emails boolean DEFAULT false,
  uses_multiple_webhooks boolean DEFAULT false,
  CONSTRAINT endpoints_pkey PRIMARY KEY (id),
  CONSTRAINT endpoints_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
-- Create plan enum type
CREATE TYPE plan_type AS ENUM ('FREE', 'PRO', 'GROWTH', 'ENTERPRISE');

CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  plan plan_type NOT NULL DEFAULT 'FREE',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  user_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.submissions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  endpoint_id uuid NOT NULL,
  data jsonb NOT NULL,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT submissions_pkey PRIMARY KEY (id),
  CONSTRAINT submissions_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoints(id)
);
CREATE TABLE public.webhook_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  submission_id uuid NOT NULL,
  endpoint_webhook_id uuid,
  webhook_url text NOT NULL,
  status_code integer,
  response_body text,
  error_message text,
  status text NOT NULL CHECK (status = ANY (ARRAY['sent'::text, 'failed'::text, 'pending'::text])),
  sent_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT webhook_logs_pkey PRIMARY KEY (id),
  CONSTRAINT webhook_logs_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submissions(id),
  CONSTRAINT webhook_logs_endpoint_webhook_id_fkey FOREIGN KEY (endpoint_webhook_id) REFERENCES public.endpoint_webhooks(id)
);

-- Monthly submission counts table for billing and usage tracking
CREATE TABLE public.monthly_submission_counts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  year integer NOT NULL,
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  submission_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT monthly_submission_counts_pkey PRIMARY KEY (id),
  CONSTRAINT monthly_submission_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT monthly_submission_counts_unique_user_month UNIQUE (user_id, year, month)
);

-- Function to increment monthly submission count
CREATE OR REPLACE FUNCTION increment_monthly_submission_count(
  p_user_id uuid,
  p_year integer,
  p_month integer
) RETURNS void AS $$
BEGIN
  -- Try to update existing record
  UPDATE monthly_submission_counts 
  SET submission_count = submission_count + 1,
      updated_at = now()
  WHERE user_id = p_user_id 
    AND year = p_year 
    AND month = p_month;
  
  -- If no record was updated, insert a new one
  IF NOT FOUND THEN
    INSERT INTO monthly_submission_counts (user_id, year, month, submission_count)
    VALUES (p_user_id, p_year, p_month, 1)
    ON CONFLICT (user_id, year, month) 
    DO UPDATE SET 
      submission_count = monthly_submission_counts.submission_count + 1,
      updated_at = now();
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to get current month submission count for a user
CREATE OR REPLACE FUNCTION get_current_month_submission_count(p_user_id uuid)
RETURNS integer AS $$
DECLARE
  current_count integer := 0;
BEGIN
  SELECT COALESCE(submission_count, 0) INTO current_count
  FROM monthly_submission_counts
  WHERE user_id = p_user_id
    AND year = EXTRACT(YEAR FROM now())
    AND month = EXTRACT(MONTH FROM now());
  
  RETURN current_count;
END;
$$ LANGUAGE plpgsql;