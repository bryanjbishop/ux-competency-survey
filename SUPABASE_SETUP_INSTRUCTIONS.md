# Supabase Setup Instructions

Follow these steps to set up Supabase for your UX Competency Survey app.

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click "New Project"
3. Fill in:
   - **Name**: ux-competency-survey
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project" (takes ~2 minutes)

## Step 2: Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `supabase-setup.sql`
4. Click "Run" to execute the SQL

This will create:
- `managers` table (for authenticated managers)
- `survey_responses` table (for survey data)
- Row Level Security policies
- Indexes for performance

## Step 3: Create Manager User

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter:
   - **Email**: manager@familysearch.org (or your preferred email)
   - **Password**: Create a secure password
   - **Auto Confirm User**: ✅ Check this box
4. Click "Create user"

## Step 4: Get API Credentials

1. Go to **Project Settings** (gear icon)
2. Click **API**
3. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

⚠️ **Do NOT share your `service_role` key - we don't need it**

## Step 5: Update Configuration

1. Open `supabase-config.js`
2. Replace:
   - `YOUR_SUPABASE_URL` with your Project URL
   - `YOUR_SUPABASE_ANON_KEY` with your anon public key

## Step 6: Update HTML

Add these lines to your `index.html` in the `<head>` section, before `competencies.js`:

```html
<!-- Supabase Client -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>
```

## Step 7: Test

1. Open `index.html` in your browser
2. Click "Manager" to sign in
3. Use the email and password you created in Step 3
4. Complete a survey and verify it saves to Supabase (check the Table Editor in Supabase dashboard)

## Security Notes

✅ **What's Secure Now:**
- No hardcoded passwords in code
- Real authentication with Supabase Auth
- Row Level Security (only authenticated users can view dashboard)
- Survey responses stored in secure database
- API keys are public-safe (anon key is meant to be in frontend)

⚠️ **Next Steps for Production:**
- Set up custom domain
- Add email verification
- Add password reset functionality
- Set up proper environment variables for deployment

## Troubleshooting

**Error: "Invalid API key"**
- Double-check your SUPABASE_URL and SUPABASE_ANON_KEY in `supabase-config.js`

**Error: "Row Level Security policy violation"**
- Make sure you ran the SQL setup script completely
- Check that policies were created in Supabase dashboard

**Can't sign in**
- Make sure you created the user in Authentication → Users
- Make sure you checked "Auto Confirm User"
- Try resetting the password in Supabase dashboard
