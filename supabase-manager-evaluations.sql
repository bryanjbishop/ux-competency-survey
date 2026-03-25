-- Manager Evaluations Schema
-- Run this in the Supabase SQL Editor to add manager evaluation functionality

-- Create manager_reports table to track manager-report relationships
CREATE TABLE IF NOT EXISTS manager_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_email TEXT NOT NULL,
  report_name TEXT NOT NULL,
  report_level TEXT NOT NULL CHECK (report_level IN ('intern', 'ux1', 'ux2', 'ux3', 'ux4')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(manager_email, report_name)
);

-- Create manager_evaluations table to store manager assessments
CREATE TABLE IF NOT EXISTS manager_evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  manager_email TEXT NOT NULL,
  report_name TEXT NOT NULL,
  report_level TEXT NOT NULL CHECK (report_level IN ('intern', 'ux1', 'ux2', 'ux3', 'ux4')),
  responses JSONB NOT NULL,
  notes JSONB DEFAULT '{}',
  evaluation_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add evaluation_type to survey_responses to distinguish self vs manager assessments
ALTER TABLE survey_responses
ADD COLUMN IF NOT EXISTS evaluation_type TEXT DEFAULT 'self'
CHECK (evaluation_type IN ('self', 'manager'));

ALTER TABLE survey_responses
ADD COLUMN IF NOT EXISTS evaluated_by TEXT;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_manager_reports_manager_email
  ON manager_reports(manager_email);

CREATE INDEX IF NOT EXISTS idx_manager_reports_report_name
  ON manager_reports(report_name);

CREATE INDEX IF NOT EXISTS idx_manager_evaluations_manager_email
  ON manager_evaluations(manager_email);

CREATE INDEX IF NOT EXISTS idx_manager_evaluations_report_name
  ON manager_evaluations(report_name);

CREATE INDEX IF NOT EXISTS idx_survey_responses_evaluation_type
  ON survey_responses(evaluation_type);

-- Enable Row Level Security
ALTER TABLE manager_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE manager_evaluations ENABLE ROW LEVEL SECURITY;

-- Policies for manager_reports
CREATE POLICY "Authenticated managers can read all manager-report relationships"
  ON manager_reports
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can insert manager-report relationships"
  ON manager_reports
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can update manager-report relationships"
  ON manager_reports
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can delete manager-report relationships"
  ON manager_reports
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Policies for manager_evaluations
CREATE POLICY "Authenticated managers can read all evaluations"
  ON manager_evaluations
  FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can insert evaluations"
  ON manager_evaluations
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can update evaluations"
  ON manager_evaluations
  FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated managers can delete evaluations"
  ON manager_evaluations
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create triggers for updated_at
CREATE TRIGGER update_manager_reports_updated_at
  BEFORE UPDATE ON manager_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_manager_evaluations_updated_at
  BEFORE UPDATE ON manager_evaluations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial manager-report relationships
-- Bryan Bishop's direct reports
INSERT INTO manager_reports (manager_email, report_name, report_level) VALUES
  ('bryan.bishop@familysearch.org', 'Ryan Plumb', 'ux4'),
  ('bryan.bishop@familysearch.org', 'Bethany Bateman', 'ux4'),
  ('bryan.bishop@familysearch.org', 'Kaytlyn Cheuk', 'ux2')
ON CONFLICT (manager_email, report_name) DO NOTHING;

COMMENT ON TABLE manager_reports IS 'Manager-report relationships for evaluations';
COMMENT ON TABLE manager_evaluations IS 'Manager evaluations of direct reports';
