-- Database Security Patch Migration
-- This script fixes the column name mismatch and adds missing security columns
-- Run this after the main security upgrade has been applied

-- Step 1: Add the missing require_api_key column if it doesn't exist
-- (This handles the case where the original script used api_key_required instead)
DO $$ 
BEGIN
    -- Check if require_api_key column exists
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'require_api_key'
    ) THEN
        -- Add the require_api_key column
        ALTER TABLE public.endpoints 
        ADD COLUMN require_api_key boolean DEFAULT false;
        
        -- If api_key_required exists, copy its values and drop it
        IF EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'endpoints' 
            AND column_name = 'api_key_required'
        ) THEN
            UPDATE public.endpoints 
            SET require_api_key = api_key_required;
            
            ALTER TABLE public.endpoints 
            DROP COLUMN api_key_required;
        END IF;
    END IF;
END $$;

-- Step 2: Ensure api_key column exists in projects table
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' 
        AND column_name = 'api_key'
    ) THEN
        ALTER TABLE public.projects 
        ADD COLUMN api_key text NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex') UNIQUE;
    END IF;
END $$;

-- Step 3: Create the missing function to generate API keys
CREATE OR REPLACE FUNCTION generate_project_api_key()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Step 4: Create a function to create a new project with API key
CREATE OR REPLACE FUNCTION create_project_with_api_key(
  p_name text,
  p_description text,
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