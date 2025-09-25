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
  CONSTRAINT email_logs_endpoint_email_id_fkey FOREIGN KEY (endpoint_email_id) REFERENCES public.endpoint_emails(id),
  CONSTRAINT email_logs_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submissions(id)
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
  cors_enabled boolean DEFAULT false,
  require_api_key boolean DEFAULT false,
  endpoint_key_deprecated boolean DEFAULT true,
  file_uploads_enabled boolean DEFAULT false,
  allowed_file_types ARRAY DEFAULT ARRAY['image/jpeg'::text, 'image/png'::text, 'image/gif'::text, 'image/webp'::text, 'application/pdf'::text, 'text/plain'::text, 'text/csv'::text, 'application/msword'::text, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'::text],
  max_file_size_mb integer DEFAULT 10,
  max_files_per_submission integer DEFAULT 5,
  json_validation_enabled boolean DEFAULT false,
  json_schema jsonb,
  variable_paths text[] DEFAULT ARRAY[]::text[],
  CONSTRAINT endpoints_pkey PRIMARY KEY (id),
  CONSTRAINT endpoints_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.file_uploads (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  submission_id uuid NOT NULL,
  original_filename text NOT NULL,
  stored_filename text NOT NULL,
  file_path text NOT NULL,
  file_size_bytes bigint NOT NULL,
  mime_type text NOT NULL,
  storage_bucket text NOT NULL DEFAULT 'form-uploads'::text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT file_uploads_pkey PRIMARY KEY (id),
  CONSTRAINT file_uploads_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submissions(id)
);
CREATE TABLE public.monthly_submission_counts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  year integer NOT NULL,
  month integer NOT NULL CHECK (month >= 1 AND month <= 12),
  submission_count integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT monthly_submission_counts_pkey PRIMARY KEY (id),
  CONSTRAINT monthly_submission_counts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  plan USER-DEFINED NOT NULL DEFAULT 'FREE'::plan_type,
  zapier_api_key text DEFAULT encode(gen_random_bytes(32), 'hex'::text) UNIQUE,
  dodo_customer_id text,
  dodo_subscription_id text,
  dodo_subscription_status text CHECK (dodo_subscription_status = ANY (ARRAY['active'::text, 'cancelled'::text, 'expired'::text, 'past_due'::text, 'trialing'::text, 'incomplete'::text, 'incomplete_expired'::text, 'unpaid'::text])),
  dodo_subscription_current_period_start timestamp with time zone,
  dodo_subscription_current_period_end timestamp with time zone,
  dodo_subscription_cancel_at_period_end boolean DEFAULT false,
  dodo_last_payment_date timestamp with time zone,
  dodo_next_payment_date timestamp with time zone,
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
  api_key text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'::text) UNIQUE,
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
  zapier_status text CHECK (zapier_status = ANY (ARRAY['success'::text, 'failure'::text])),
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
  CONSTRAINT webhook_logs_endpoint_webhook_id_fkey FOREIGN KEY (endpoint_webhook_id) REFERENCES public.endpoint_webhooks(id),
  CONSTRAINT webhook_logs_submission_id_fkey FOREIGN KEY (submission_id) REFERENCES public.submissions(id)
);
CREATE TABLE public.zapier_subscriptions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  endpoint_id uuid NOT NULL,
  target_url text NOT NULL,
  event_type text NOT NULL DEFAULT 'new_submission'::text CHECK (event_type = ANY (ARRAY['new_submission'::text])),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT zapier_subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT zapier_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id),
  CONSTRAINT zapier_subscriptions_endpoint_id_fkey FOREIGN KEY (endpoint_id) REFERENCES public.endpoints(id)
);