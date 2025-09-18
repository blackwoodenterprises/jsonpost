-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create endpoints table
CREATE TABLE endpoints (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  endpoint_key TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  method TEXT NOT NULL DEFAULT 'POST',
  path TEXT NOT NULL,
  allowed_domains TEXT[],
  email_notifications BOOLEAN DEFAULT false,
  webhook_url TEXT,
  redirect_url TEXT,
  success_message TEXT DEFAULT 'Thank you for your submission!',
  error_message TEXT DEFAULT 'There was an error processing your submission.',
  store_submissions BOOLEAN DEFAULT true,
  spam_protection BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  endpoint_id UUID REFERENCES endpoints(id) ON DELETE CASCADE NOT NULL,
  data JSONB NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_endpoints_project_id ON endpoints(project_id);
CREATE INDEX idx_endpoints_endpoint_key ON endpoints(endpoint_key);
CREATE UNIQUE INDEX idx_endpoints_project_path ON endpoints(project_id, path);
CREATE INDEX idx_submissions_endpoint_id ON submissions(endpoint_id);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_endpoints_updated_at BEFORE UPDATE ON endpoints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);

-- Endpoints policies
CREATE POLICY "Users can view endpoints of own projects" ON endpoints
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = endpoints.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create endpoints for own projects" ON endpoints
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = endpoints.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update endpoints of own projects" ON endpoints
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = endpoints.project_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete endpoints of own projects" ON endpoints
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = endpoints.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Submissions policies
CREATE POLICY "Users can view submissions of own endpoints" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM endpoints 
      JOIN projects ON projects.id = endpoints.project_id
      WHERE endpoints.id = submissions.endpoint_id 
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert submissions" ON submissions
  FOR INSERT WITH CHECK (true);

-- Function to handle user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      CONCAT(
        COALESCE(NEW.raw_user_meta_data->>'given_name', ''),
        CASE 
          WHEN NEW.raw_user_meta_data->>'given_name' IS NOT NULL 
               AND NEW.raw_user_meta_data->>'family_name' IS NOT NULL 
          THEN ' ' 
          ELSE '' 
        END,
        COALESCE(NEW.raw_user_meta_data->>'family_name', '')
      ),
      split_part(NEW.email, '@', 1)
    )
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    -- Insert with minimal data to ensure user creation succeeds
    INSERT INTO profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, split_part(NEW.email, '@', 1))
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();