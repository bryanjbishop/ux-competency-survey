# Manager Evaluation System - Setup Guide

## Overview
The manager evaluation system allows UX Lead Managers to evaluate their direct reports using the same competency framework. The dashboard displays side-by-side comparisons of self-assessments and manager evaluations.

## Features
✅ Manager-report relationships tracking
✅ Manager evaluation flow (identical to self-assessment)
✅ Side-by-side comparison view in dashboard
✅ Difference highlighting (shows +/- between self and manager scores)
✅ Evaluation date tracking
✅ Notes/comments support (ready for future enhancement)

## Setup Instructions

### Step 1: Run Database Migration

1. Open your Supabase project dashboard at https://supabase.com
2. Navigate to **SQL Editor**
3. Click **"New Query"**
4. Copy and paste the contents of `supabase-manager-evaluations.sql`
5. Click **"Run"** to execute the migration

This will create:
- `manager_reports` table - stores manager-report relationships
- `manager_evaluations` table - stores manager evaluations
- Proper Row Level Security policies
- Initial data for Bryan Bishop's direct reports:
  - Ryan Plumb (UX 4)
  - Bethany Bateman (UX 4)
  - Kaytlyn Cheuk (UX 2)

### Step 2: Verify Bryan's Manager Account

Make sure Bryan's manager account exists in Supabase Auth:
1. Go to **Authentication** → **Users**
2. Look for user with email: `bryan.bishop@familysearch.org`
3. If it doesn't exist, create it:
   - Click **"Add user"** → **"Create new user"**
   - Email: `bryan.bishop@familysearch.org`
   - Password: (set a secure password)
   - **Auto Confirm User**: ✅ Check this box
   - Click **"Create user"**

### Step 3: Deploy Changes

Run the deployment script:
```bash
cd "/Users/bryanjamesbishop/Documents/AI Practice/Claude Playground/ux-competency-survey-tailwind"
./deploy.sh
```

## How It Works

### For Managers

1. **Sign in** to the manager dashboard
2. Click **"Evaluate Direct Reports"** button (top-right of dashboard)
3. **Select** which direct report to evaluate
4. **Complete** the survey using their UX level's competencies
5. **Submit** - evaluation is saved and linked to that team member

### Dashboard View

When viewing results, the dashboard shows:
- **Self-Assessment** scores (left column)
- **Manager Evaluation** scores (right column, if exists)
- **Difference** indicator (+/- number showing the gap)
- **Averages** for both self and manager evaluations
- **Badge** indicating when a manager evaluation is available

### Score Differences

- **Green (+)** - Manager rated higher than self
- **Red (-)** - Manager rated lower than self
- **Gray (0)** - Scores match

## Adding More Manager-Report Relationships

### Option 1: Via SQL (Recommended for bulk)

Run this query in Supabase SQL Editor:
```sql
INSERT INTO manager_reports (manager_email, report_name, report_level) VALUES
  ('manager.email@familysearch.org', 'Designer Name', 'ux2'),
  ('manager.email@familysearch.org', 'Another Designer', 'ux3')
ON CONFLICT (manager_email, report_name) DO NOTHING;
```

### Option 2: Via Supabase Table Editor

1. Go to **Table Editor** → **manager_reports**
2. Click **"Insert row"**
3. Fill in:
   - `manager_email`: Manager's email (must match their auth email)
   - `report_name`: Direct report's name (must match their survey name)
   - `report_level`: Their UX level (`intern`, `ux1`, `ux2`, `ux3`, or `ux4`)
4. Click **"Save"**

## UX Level Values

Use these exact values for `report_level`:
- `intern` - Intern
- `ux1` - UX 1 (Associate Designer)
- `ux2` - UX 2 (Junior Designer)
- `ux3` - UX 3 (Mid-Level Designer)
- `ux4` - UX 4 (Senior Designer)

## Troubleshooting

### Manager can't see "Evaluate Direct Reports" button
- Ensure they're signed in with the correct manager account
- Check that their email matches an entry in `manager_reports` table

### Direct reports list is empty
- Verify `manager_reports` table has entries for that manager's email
- Check that `manager_email` exactly matches their authentication email
- Verify `report_level` is one of the valid values above

### Evaluation doesn't show in dashboard
- Confirm evaluation was completed and saved successfully
- Check `manager_evaluations` table in Supabase for the entry
- Verify `report_name` matches exactly between self-assessment and manager evaluation

### Side-by-side comparison not showing
- Both a self-assessment AND manager evaluation must exist for the same person
- Names must match exactly (case-sensitive)
- UX levels must match between self-assessment and manager evaluation

## Database Schema

### manager_reports
Stores manager-report relationships
- `id` - UUID primary key
- `manager_email` - Manager's email address
- `report_name` - Direct report's full name
- `report_level` - Their UX level (intern, ux1-4)
- `created_at` / `updated_at` - Timestamps

### manager_evaluations
Stores manager evaluations of direct reports
- `id` - UUID primary key
- `manager_email` - Who conducted the evaluation
- `report_name` - Who was evaluated
- `report_level` - UX level evaluated at
- `responses` - JSONB of all competency ratings
- `notes` - JSONB for future notes/comments feature
- `evaluation_date` - When evaluation was completed
- `created_at` / `updated_at` - Timestamps

## Future Enhancements

Potential features to add:
- [ ] Notes/comments per competency
- [ ] Historical evaluation tracking (multiple evaluations over time)
- [ ] Evaluation reminders/scheduling
- [ ] Export comparison reports
- [ ] Aggregate team analytics
- [ ] Goals alignment with evaluations

## Support

For questions or issues:
1. Check Supabase logs for database errors
2. Check browser console for JavaScript errors
3. Verify all email addresses match exactly
4. Confirm UX level values are using correct format

---
**Last Updated:** March 25, 2026
