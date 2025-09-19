-- JSONPost Database Upgrade Script
-- This script adds plan and billing features to your existing database
-- Execute this in your Supabase SQL editor

-- Step 1: Create plan enum type
CREATE TYPE plan_type AS ENUM ('FREE', 'PRO', 'GROWTH', 'ENTERPRISE');

-- Step 2: Add plan column to existing profiles table
ALTER TABLE public.profiles 
ADD COLUMN plan plan_type NOT NULL DEFAULT 'FREE';

-- Step 3: Create monthly submission counts table for billing and usage tracking
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

-- Step 4: Create function to increment monthly submission count
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

-- Step 5: Create function to get current month submission count for a user
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

-- Step 6: Enable Row Level Security on the new table
ALTER TABLE public.monthly_submission_counts ENABLE ROW LEVEL SECURITY;

-- Step 7: Create RLS policies for monthly_submission_counts table
-- Users can only see their own submission counts
CREATE POLICY "Users can view own submission counts" ON public.monthly_submission_counts
  FOR SELECT USING (user_id = auth.uid());

-- Users can only insert their own submission counts (for system use)
CREATE POLICY "Users can insert own submission counts" ON public.monthly_submission_counts
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Users can only update their own submission counts (for system use)
CREATE POLICY "Users can update own submission counts" ON public.monthly_submission_counts
  FOR UPDATE USING (user_id = auth.uid());

-- Step 8: Create indexes for better performance
CREATE INDEX idx_monthly_submission_counts_user_date ON public.monthly_submission_counts(user_id, year, month);
CREATE INDEX idx_monthly_submission_counts_date ON public.monthly_submission_counts(year, month);

-- Step 9: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.monthly_submission_counts TO anon, authenticated;
GRANT EXECUTE ON FUNCTION increment_monthly_submission_count(uuid, integer, integer) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_current_month_submission_count(uuid) TO anon, authenticated;

-- Verification queries (optional - you can run these to verify the upgrade worked)
-- SELECT * FROM pg_type WHERE typname = 'plan_type';
-- SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'plan';
-- SELECT table_name FROM information_schema.tables WHERE table_name = 'monthly_submission_counts';
-- SELECT routine_name FROM information_schema.routines WHERE routine_name IN ('increment_monthly_submission_count', 'get_current_month_submission_count');

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database upgrade completed successfully! Your JSONPost database now supports plans and billing features.';
END $$;