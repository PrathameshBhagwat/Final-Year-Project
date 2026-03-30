# ⚠️ IMPORTANT: Manual Database Setup Instructions

## Why Manual Setup?
Due to hostname resolution issues with the PostgreSQL connection, we'll create tables directly in Supabase's web interface.

## Step-by-Step Instructions:

### 1. Go to Supabase Dashboard
- Visit: https://app.supabase.com
- Login with your account
- Select your project: **wmnegxgkynzgqwjfscph**

### 2. Open SQL Editor
- Click on **SQL Editor** in the left sidebar
- Click **New Query**

### 3. Copy and Paste the Schema
Copy the entire content from: `complete-database-schema.sql`

**File location in your project:**
```
Career-Advisor-SIH/complete-database-schema.sql
```

### 4. Execute the Query
1. Paste the complete schema SQL from the file
2. Click **Run** button (or press Ctrl+Enter)
3. Wait for completion (should take 30-60 seconds)

### Alternative: Quick Setup with Individual Queries

If the complete schema fails, run these in sequence:

**Query 1: Create Extensions**
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

**Query 2: Create Core Tables**
Copy the table creation statements from `complete-database-schema.sql`

**Query 3: Enable RLS**
Copy the RLS ALTER statements from `complete-database-schema.sql`

**Query 4: Create RLS Policies**
Copy the RLS policy creation statements from `complete-database-schema.sql`

## Verification

### Check if tables were created:
1. Go to **Table Editor** in Supabase dashboard
2. You should see tables like:
   - `profiles`
   - `career_roadmaps`
   - `quiz_results`
   - `colleges`
   - `saved_colleges`
   - `user_achievements`
   - `user_skills`
   - `activities`
   - And more...

### Check from terminal:
```bash
npm run db:studio
```
This will open Prisma Studio showing all tables and data.

## Connection String for Local Development

After tables are created, use this DATABASE_URL:
```
DATABASE_URL="postgresql://postgres.wmnegxgkynzgqwjfscph:Prathamesh%4007@db.wmnegxgkynzgqwjfscph.supabase.co:5432/postgres"
```

## Troubleshooting

### Tables still not visible in dashboard?
- Refresh the browser page
- Click the refresh icon in the Table Editor
- Close and reopen Supabase dashboard

### Connection still timing out?
- Verify your Supabase project is not paused
- Check: Project Settings > General > Status
- Ensure you're using the correct password

### Need to reset everything?
1. Go to Supabase Settings > Database
2. Click "Reset Database" (⚠️ This deletes all data)
3. Rerun the schema setup

## What Tables Were Created?

✅ **User Management:**
- profiles

✅ **Career & Learning:**
- career_roadmaps
- quiz_results

✅ **College System:**
- colleges
- saved_colleges

✅ **Job Hunting:**
- job_applications
- user_resumes
- job_matches
- outreach_drafts

✅ **Activity & Gamification:**
- activities
- user_achievements
- user_skills

✅ **Subscriptions & Payments:**
- user_subscriptions
- payment_history

## Next Steps After Setup

1. Run `npm run db:generate` to sync Prisma client
2. Start dev server: `npm run dev`
3. Verify connection: Check browser network tab in Dev Tools
4. Test API endpoints: `curl http://localhost:3001/api/achievements`

---

**Questions?** Check the Supabase SQL Editor documentation or logs if queries fail.
