-- Database Column Fix Patch
-- This patch fixes the column name mismatch between database schema and frontend code
-- The frontend expects 'require_api_key' but the database has 'api_key_required'
-- Created: $(date)

-- Step 1: Check if we need to rename the column
DO $$ 
BEGIN
    -- If api_key_required exists but require_api_key doesn't, rename it
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'api_key_required'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'require_api_key'
        AND table_schema = 'public'
    ) THEN
        -- Rename the column to match frontend expectations
        ALTER TABLE public.endpoints 
        RENAME COLUMN api_key_required TO require_api_key;
        
        RAISE NOTICE 'Renamed column api_key_required to require_api_key in endpoints table';
    END IF;
    
    -- If neither column exists, add require_api_key
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'require_api_key'
        AND table_schema = 'public'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'api_key_required'
        AND table_schema = 'public'
    ) THEN
        -- Add the require_api_key column
        ALTER TABLE public.endpoints 
        ADD COLUMN require_api_key boolean DEFAULT false;
        
        RAISE NOTICE 'Added require_api_key column to endpoints table';
    END IF;
END $$;

-- Step 2: Ensure cors_enabled column exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'cors_enabled'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.endpoints 
        ADD COLUMN cors_enabled boolean DEFAULT false;
        
        RAISE NOTICE 'Added cors_enabled column to endpoints table';
    END IF;
END $$;

-- Step 3: Ensure allowed_domains column exists with proper type
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'endpoints' 
        AND column_name = 'allowed_domains'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.endpoints 
        ADD COLUMN allowed_domains text[];
        
        -- Create GIN index for array operations
        CREATE INDEX IF NOT EXISTS idx_endpoints_allowed_domains 
        ON public.endpoints USING gin(allowed_domains);
        
        RAISE NOTICE 'Added allowed_domains column to endpoints table with GIN index';
    END IF;
END $$;

-- Step 4: Ensure projects table has api_key column
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'projects' 
        AND column_name = 'api_key'
        AND table_schema = 'public'
    ) THEN
        -- Add api_key column with unique constraint
        ALTER TABLE public.projects 
        ADD COLUMN api_key text;
        
        -- Generate API keys for existing projects
        UPDATE public.projects 
        SET api_key = encode(gen_random_bytes(32), 'hex')
        WHERE api_key IS NULL;
        
        -- Make it NOT NULL and UNIQUE after populating
        ALTER TABLE public.projects 
        ALTER COLUMN api_key SET NOT NULL;
        
        ALTER TABLE public.projects 
        ADD CONSTRAINT projects_api_key_unique UNIQUE (api_key);
        
        RAISE NOTICE 'Added api_key column to projects table with unique constraint';
    END IF;
END $$;

-- Step 5: Create or replace helper functions
CREATE OR REPLACE FUNCTION generate_project_api_key()
RETURNS text AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Step 6: Add comments for documentation
COMMENT ON COLUMN public.endpoints.require_api_key IS 'Whether API key verification is required for this endpoint';
COMMENT ON COLUMN public.endpoints.cors_enabled IS 'Whether CORS origin checking is enabled for this endpoint';
COMMENT ON COLUMN public.endpoints.allowed_domains IS 'Array of allowed domains for CORS. Supports wildcards. Null means all domains allowed when cors_enabled is false';
COMMENT ON COLUMN public.projects.api_key IS 'Project-level API key for server-to-server authentication';

-- Step 7: Verify the changes
DO $$
DECLARE
    col_count integer;
BEGIN
    -- Check that require_api_key column exists
    SELECT COUNT(*) INTO col_count
    FROM information_schema.columns 
    WHERE table_name = 'endpoints' 
    AND column_name = 'require_api_key'
    AND table_schema = 'public';
    
    IF col_count = 0 THEN
        RAISE EXCEPTION 'Failed to create require_api_key column in endpoints table';
    END IF;
    
    -- Check that api_key column exists in projects
    SELECT COUNT(*) INTO col_count
    FROM information_schema.columns 
    WHERE table_name = 'projects' 
    AND column_name = 'api_key'
    AND table_schema = 'public';
    
    IF col_count = 0 THEN
        RAISE EXCEPTION 'Failed to create api_key column in projects table';
    END IF;
    
    RAISE NOTICE 'Database patch applied successfully! All required columns are present.';
END $$;