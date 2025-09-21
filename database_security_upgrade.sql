-- Database Security Upgrade Migration
-- This script implements the new security features for JsonPost

-- Step 1: Add api_key column to projects table
ALTER TABLE public.projects 
ADD COLUMN api_key text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex') UNIQUE;

-- Step 2: Add security configuration columns to endpoints table
ALTER TABLE public.endpoints 
ADD COLUMN cors_enabled boolean DEFAULT false,
ADD COLUMN require_api_key boolean DEFAULT false;

-- Step 3: Update allowed_domains column to be more explicit (it already exists but let's ensure it's properly configured)
-- The allowed_domains column already exists as ARRAY, so we just need to ensure it's properly indexed
CREATE INDEX IF NOT EXISTS idx_endpoints_allowed_domains ON public.endpoints USING GIN (allowed_domains);

-- Step 4: Remove the endpoint_key column from endpoints table (after ensuring no critical dependencies)
-- First, let's check if there are any foreign key constraints or dependencies
-- Note: This should be run carefully in production after ensuring no code depends on endpoint_key

-- For now, we'll keep the endpoint_key column but mark it as deprecated
-- In a future migration, we can remove it completely
ALTER TABLE public.endpoints 
ADD COLUMN endpoint_key_deprecated boolean DEFAULT true;

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_endpoints_cors_enabled ON public.endpoints (cors_enabled);
CREATE INDEX IF NOT EXISTS idx_endpoints_api_key_required ON public.endpoints (api_key_required);
CREATE INDEX IF NOT EXISTS idx_projects_api_key ON public.projects (api_key);

-- Step 6: Update existing projects to have API keys (for existing data)
-- This will generate unique API keys for all existing projects
UPDATE public.projects 
SET api_key = encode(gen_random_bytes(32), 'hex')
WHERE api_key IS NULL OR api_key = '';

-- Step 7: Create a function to generate new API keys for projects
CREATE OR REPLACE FUNCTION generate_project_api_key()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Step 8: Create a function to regenerate API key for a project
CREATE OR REPLACE FUNCTION regenerate_project_api_key(project_id uuid)
RETURNS text AS $$
DECLARE
  new_api_key text;
BEGIN
  new_api_key := generate_project_api_key();
  
  UPDATE public.projects 
  SET api_key = new_api_key, updated_at = now()
  WHERE id = project_id;
  
  RETURN new_api_key;
END;
$$ LANGUAGE plpgsql;

-- Step 9: Create a function to create a new project with API key
CREATE OR REPLACE FUNCTION create_project_with_api_key(
  p_name text,
  p_description text DEFAULT NULL,
  p_user_id uuid
)
RETURNS TABLE(id uuid, name text, description text, api_key text, created_at timestamptz) AS $$
DECLARE
  new_project_id uuid;
  new_api_key text;
BEGIN
  -- Generate a new API key
  new_api_key := generate_project_api_key();
  
  -- Insert the new project
  INSERT INTO public.projects (name, description, user_id, api_key)
  VALUES (p_name, p_description, p_user_id, new_api_key)
  RETURNING projects.id INTO new_project_id;
  
  -- Return the created project data
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.description,
    p.api_key,
    p.created_at
  FROM public.projects p
  WHERE p.id = new_project_id;
END;
$$ LANGUAGE plpgsql;

-- Step 10: Add comments for documentation
COMMENT ON COLUMN public.projects.api_key IS 'Project-level API key for server-to-server authentication';
COMMENT ON COLUMN public.endpoints.cors_enabled IS 'Whether CORS origin checking is enabled for this endpoint';
COMMENT ON COLUMN public.endpoints.require_api_key IS 'Whether API key verification is required for this endpoint';
COMMENT ON COLUMN public.endpoints.allowed_domains IS 'Array of allowed domains for CORS. Supports wildcards. Null means all domains allowed when cors_enabled is false';

-- Step 11: Create a view for endpoint security settings (useful for admin/debugging)
CREATE OR REPLACE VIEW endpoint_security_view AS
SELECT 
  e.id as endpoint_id,
  e.name as endpoint_name,
  e.path as endpoint_path,
  p.id as project_id,
  p.name as project_name,
  p.api_key as project_api_key,
  e.cors_enabled,
  e.require_api_key,
  e.allowed_domains,
  CASE 
    WHEN e.cors_enabled AND e.allowed_domains IS NOT NULL THEN 'CORS Restricted'
    WHEN e.cors_enabled AND e.allowed_domains IS NULL THEN 'CORS Enabled (All Origins)'
    ELSE 'CORS Disabled'
  END as cors_status,
  CASE 
    WHEN e.require_api_key THEN 'API Key Required'
    ELSE 'API Key Optional'
  END as api_key_status
FROM public.endpoints e
JOIN public.projects p ON e.project_id = p.id;

-- Grant appropriate permissions
GRANT SELECT ON endpoint_security_view TO authenticated;