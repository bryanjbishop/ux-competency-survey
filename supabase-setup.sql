-- Supabase Database Setup for UX Competency Survey
-- Run this in the Supabase SQL Editor

-- Create managers table for authentication
CREATE TABLE IF NOT EXISTS managers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create survey_responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  designer_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('intern', 'ux1', 'ux2', 'ux3', 'ux4')),
  responses JSONB NOT NULL,
  goals JSONB DEFAULT '{}',
  start_time TIMESTAMPTZ NOT NULL,
  completion_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on designer_name for faster lookups
CREATE INDEX IF NOT EXISTS idx_survey_responses_designer_name
  ON survey_responses(designer_name);

-- Create index on completion_time
CREATE INDEX IF NOT EXISTS idx_survey_responses_completion_time
  ON survey_responses(completion_time);

-- Enable Row Level Security
ALTER TABLE managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Policies for managers table
-- Managers can only read their own data
CREATE POLICY "Managers can read own data"
  ON managers
  FOR SELECT
  USING (auth.uid() = id);

-- Policies for survey_responses table
-- Anyone can insert survey responses (public survey)
CREATE POLICY "Anyone can insert survey responses"
  ON survey_responses
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated managers can read survey responses
CREATE POLICY "Authenticated managers can read all responses"
  ON survey_responses
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated managers can update survey responses
CREATE POLICY "Authenticated managers can update responses"
  ON survey_responses
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Only authenticated managers can delete survey responses
CREATE POLICY "Authenticated managers can delete responses"
  ON survey_responses
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert demo manager account (you'll need to create this user in Supabase Auth UI)
-- Email: manager@familysearch.org
-- Password: Set in Supabase Auth UI

COMMENT ON TABLE managers IS 'Managers who can access the survey dashboard';
COMMENT ON TABLE survey_responses IS 'Survey responses from UX designers';
