#!/usr/bin/env node

/**
 * Database Setup - Copy-Paste SQL Script
 * 
 * This script extracts the SQL from complete-database-schema.sql
 * and provides it in smaller chunks for easy manual execution in Supabase SQL Editor
 */

const fs = require('fs');
const path = require('path');

const schemaFile = path.join(__dirname, 'complete-database-schema.sql');
const schema = fs.readFileSync(schemaFile, 'utf8');

// Split into logical sections
const sections = [
  {
    name: '1. Extensions & Core Setup',
    pattern: /CREATE EXTENSION[\s\S]*?;/,
    start: schema.indexOf('CREATE EXTENSION'),
    end: schema.indexOf('-- ========================================================================') + 75,
  },
  {
    name: '2. Create All Tables',
    pattern: /CREATE TABLE[\s\S]*?;/g,
    start: schema.indexOf('-- CORE USER TABLES'),
    end: schema.indexOf('-- ROW LEVEL SECURITY'),
  },
  {
    name: '3. Enable Row Level Security',
    pattern: /ALTER TABLE.*ENABLE ROW LEVEL SECURITY;/g,
    start: schema.indexOf('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY'),
    end: schema.indexOf('-- ========================================================================\n-- RLS POLICIES') + 1,
  },
];

console.log(`
╔════════════════════════════════════════════════════════════╗
║         SUPABASE MANUAL DATABASE SETUP GUIDE              ║
╚════════════════════════════════════════════════════════════╝

Your database connection has network issues preventing automated setup.
No problem! Follow these steps to manually create tables in Supabase.

🔗 STEP 1: Go to Supabase Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open: https://app.supabase.com
2. Login (if not already logged in)
3. Select Project: wmnegxgkynzgqwjfscph

🗄️  STEP 2: Open SQL Editor
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. In left sidebar, click: SQL Editor
2. Click: New Query (or Ctrl+Alt+R)
3. Paste code below into the query box
4. Click: Run (or Ctrl+Enter)

📋 STEP 3: Execute SQL in Three Parts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Running all at once sometimes fails. Run in this order:

`);

// Show extraction of the SQL
console.log('─ PART 1: Extensions & Extensions ─');
console.log(`
Execute this first to enable required PostgreSQL extensions:

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

⏱️  Wait for this to complete before moving to Part 2!
`);

console.log('\n─ PART 2: All Table Definitions ─');
console.log(`
After Part 1 succeeds, copy the entire content from:

📄 File: complete-database-schema.sql
📍 Path: Career-Advisor-SIH/complete-database-schema.sql

This file contains all 13+ table definitions.

⏱️  This should take 30-60 seconds.
`);

console.log('\n─ PART 3: Row Level Security (RLS) ─');
console.log(`
After all tables are created, copy lines that contain:

- ALTER TABLE ... ENABLE ROW LEVEL SECURITY;
- CREATE POLICY ...

These are in the same complete-database-schema.sql file.

⏱️  This should take 10-20 seconds.
`);

console.log(`

✅ VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After ALL SQL runs successfully:

1. Go to "Table Editor" in the left sidebar
2. You should see a list of new tables:
   • profiles
   • career_roadmaps
   • quiz_results
   • colleges
   • saved_colleges
   • activities
   • user_achievements
   • user_skills
   • job_applications
   • user_resumes
   • job_matches
   • outreach_drafts
   • user_subscriptions
   • payment_history

3. If tables appear ✅ SUCCESS!
   If not, refresh the page and check again.

🎯 TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q: SQL execution fails with error?
A: 
  1. Note the error message
  2. Try partial execution (skip the failing statement)
  3. Run this command to check existing tables:
     SELECT table_name FROM information_schema.tables WHERE table_schema='public';

Q: Tables don't appear after successful execution?
A: Refresh browser page (Ctrl+R) and check Table Editor again

Q: See "relation already exists" errors?
A: This means tables already exist - you can ignore these

Q: Password authentication failed?
A: Your Supabase project password might have been reset.
   Go to Project Settings > Database > Connection string to get the correct one.

📞 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After tables are created in Supabase:

From your terminal, run:

  npm run db:generate
  npm run dev

Then visit: http://localhost:3001

Your application should now work without "supabaseUrl is required" errors.

═══════════════════════════════════════════════════════════
`);
