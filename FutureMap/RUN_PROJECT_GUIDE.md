📚 COMPLETE STEP-BY-STEP GUIDE TO RUN YOUR PROJECT
═════════════════════════════════════════════════════════

🎯 PREREQUISITES (Already Done ✅)
═════════════════════════════════════════════════════════
✅ Database tables created in Supabase
✅ Environment variables configured (.env)
✅ Prisma schema updated
✅ Dependencies installed (npm install)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 STEP 1: Open Terminal & Navigate to Project
═════════════════════════════════════════════════════════

Command:
  cd "c:\Users\dell\Desktop\BE Final Year Project\New Project\Career-Advisor-SIH"

Expected Output:
  PS C:\...\Career-Advisor-SIH>

⏱️  Time: < 1 second
✅ Status: Ready for next step


🚀 STEP 2: Regenerate Prisma Client
═════════════════════════════════════════════════════════

Command:
  npm run db:generate

What it does:
  - Reads prisma/schema.prisma
  - Syncs with your Supabase database
  - Generates updated TypeScript types
  - Creates @prisma/client library

Expected Output:
  > career-advisor-platform@0.1.0 db:generate
  > prisma generate
  
  Environment variables loaded from .env
  Prisma schema loaded from prisma\schema.prisma
  
  ✔ Generated Prisma Client (v5.22.0) to .\node_modules\@prisma\client

⏱️  Time: 10-15 seconds
✅ Status: Types generated, ready for development


🚀 STEP 3: Start Development Server
═════════════════════════════════════════════════════════

Command:
  npm run dev

What it does:
  - Starts Next.js development server
  - Watches for file changes
  - Enables hot reload
  - Starts on http://localhost:3000

Expected Output:
  > career-advisor-platform@0.1.0 dev
  > next dev
  
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
  - Environments: .env
  
  ✓ Ready in 2.5s
  ✓ Compiled client successfully
  ✓ Compiled in 3.2s (256 modules)
  

  GET /api/achievements 200 in 145ms

⏱️  Time: 5-10 seconds to start
✅ Status: Server running, project is LIVE


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 STEP 4: Open in Browser
═════════════════════════════════════════════════════════

URL:
  http://localhost:3000

What you should see:
  - Your Career Advisor application home page
  - All features loading without database errors
  - No "supabaseUrl is required" errors

If you see any errors:
  ❌ Check Step 5 (Verification) below
  ❌ Check terminal for error messages


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ STEP 5: Verify Database Connection (Optional)
═════════════════════════════════════════════════════════

In a NEW terminal window, run:

  npm run db:studio

This opens Prisma Studio (database GUI):
  - URL: http://localhost:5555
  - Shows all tables with data
  - Allows you to view/edit database records
  - Perfect for debugging

Expected: See all your tables:
  ✓ profiles
  ✓ career_roadmaps
  ✓ quiz_results
  ✓ colleges (with 6 sample colleges)
  ✓ user_achievements
  ✓ user_skills
  ✓ activities
  ... and more


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 STEP 6: Test API Endpoints (Optional)
═════════════════════════════════════════════════════════

Open another terminal and run:

  curl http://localhost:3000/api/achievements

Expected: JSON response like:
  {
    "completed": [],
    "inProgress": [],
    "available": [],
    "stats": {
      "totalCompleted": 0,
      "totalAvailable": 0,
      "completionRate": 0,
      "pointsEarned": 0
    }
  }

This confirms:
  ✅ Database connection works
  ✅ API routes work
  ✅ No connection errors


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 QUICK REFERENCE COMMANDS
═════════════════════════════════════════════════════════

# Start development server
npm run dev

# Regenerate Prisma types
npm run db:generate

# View database in GUI
npm run db:studio

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Push schema changes to database
npm run db:push


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐛 TROUBLESHOOTING
═════════════════════════════════════════════════════════

Issue: "supabaseUrl is required" error
Fix:
  1. Check .env has NEXT_PUBLIC_SUPABASE_URL
  2. Verify database tables exist in Supabase
  3. Run: npm run db:generate
  4. Restart server: npm run dev

Issue: "P1002: The provided database string is invalid"
Fix:
  1. Check DATABASE_URL format in .env
  2. Verify password is correct
  3. Ensure tables exist in Supabase
  4. Try: npm run db:push

Issue: Server starts but pages show errors
Fix:
  1. Check browser console (F12 > Console tab)
  2. Check terminal where you ran "npm run dev"
  3. Note the error message
  4. Check database connection with: npm run db:studio

Issue: Port 3000 already in use
Fix:
  Option A: Kill existing process
    npx lsof -ti:3000 | xargs kill -9
  
  Option B: Use different port
    npm run dev -- -p 3001


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ COMPLETE PROCESS SUMMARY
═════════════════════════════════════════════════════════

1️⃣  Navigate to project folder
2️⃣  Run: npm run db:generate
3️⃣  Run: npm run dev
4️⃣  Open: http://localhost:3000
5️⃣  Done! Your app is running 🎉

Time to complete: ~20 seconds
Difficulty: Easy ✅


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 NEXT STEPS AFTER RUNNING
═════════════════════════════════════════════════════════

✅ Test features:
   - Navigate to different pages
   - Try logging in/signing up
   - Test AI features
   - Save colleges
   - Take quiz

✅ Monitor terminal:
   - Watch for error messages
   - Check API request logs
   - Monitor database queries

✅ Keep running:
   - Server runs continuously
   - Files auto-reload on save
   - Press Ctrl+C to stop


═════════════════════════════════════════════════════════
Your Career Advisor application is ready! 🚀
═════════════════════════════════════════════════════════
