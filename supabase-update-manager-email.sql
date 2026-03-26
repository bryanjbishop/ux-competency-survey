-- Update manager email to match actual login email
-- Run this in Supabase SQL Editor

-- Delete old entries with wrong email
DELETE FROM manager_reports
WHERE manager_email = 'bryan.bishop@familysearch.org';

-- Insert correct relationships with gmail address
INSERT INTO manager_reports (manager_email, report_name, report_level) VALUES
  ('bryanjamesbishop@gmail.com', 'Ryan Plumb', 'ux4'),
  ('bryanjamesbishop@gmail.com', 'Bethany Bateman', 'ux4'),
  ('bryanjamesbishop@gmail.com', 'Kaytlyn Cheuk', 'ux2')
ON CONFLICT (manager_email, report_name) DO NOTHING;

-- Verify the data
SELECT * FROM manager_reports WHERE manager_email = 'bryanjamesbishop@gmail.com';
