-- Update the role constraint to include new levels
-- Run this in Supabase SQL Editor to add support for intern, ux1, and ux3

ALTER TABLE survey_responses
DROP CONSTRAINT IF EXISTS survey_responses_role_check;

ALTER TABLE survey_responses
ADD CONSTRAINT survey_responses_role_check
CHECK (role IN ('intern', 'ux1', 'ux2', 'ux3', 'ux4'));
