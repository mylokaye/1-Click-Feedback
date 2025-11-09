# Quick Start Guide

Get the 1-Click Feedback System running in 20 minutes!

> 🚀 **Even Faster**: Use the one-click deploy button in [DEPLOY.md](DEPLOY.md) to deploy in just 5 minutes!

## Prerequisites

✅ Node.js 18+ installed
✅ npm installed
✅ GitHub account
✅ Supabase account (sign up at [supabase.com](https://supabase.com))
✅ Vercel account (sign up at [vercel.com](https://vercel.com))

## Step 1: Clone & Install (2 minutes)

### Option A: Using Setup Script (Recommended)

```bash
# Clone the repository
git clone https://github.com/pattens-tech/1-click.git
cd 1-click

# Run automated setup script
./scripts/setup.sh
```

### Option B: Manual Setup

```bash
# Clone the repository
git clone https://github.com/pattens-tech/1-click.git
cd 1-click

# Install dependencies
npm install

# This will install:
# - next@16.0.1
# - react@19.2.0
# - react-dom@19.2.0
# - @supabase/supabase-js@2.78.0
```

## Step 2: Set Up Supabase Database (5 minutes)

### 2.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `1click-feedback`
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
4. Click "Create new project"
5. Wait ~2 minutes for provisioning

### 2.2 Create Database Table
1. Click "SQL Editor" in the left sidebar
2. Click "New Query"
3. Paste this SQL:

```sql
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  comments TEXT
);
```

4. Click "Run" or press Cmd/Ctrl + Enter
5. You should see "Success. No rows returned"

### 2.3 Get API Credentials
1. Click "Settings" (gear icon) in the left sidebar
2. Click "API" in the settings menu
3. Copy these two values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public key** (long string starting with `eyJ`)

## Step 3: Configure Environment Variables (2 minutes)

```bash
# Copy the example file
cp .env.local.example .env.local

# Edit .env.local with your favorite editor
nano .env.local  # or vim, code, etc.
```

Replace the placeholder values:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save and close the file.

## Step 4: Test Locally (3 minutes)

```bash
# Start development server
npm run dev
```

Open your browser to:
- **Feedback Page**: http://localhost:3000/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican
- **Admin Dashboard**: http://localhost:3000/admin/lob

Test the feedback flow:
1. See your 5-star rating displayed
2. Click a different star to change it
3. Wait 3 seconds for comment box
4. (Optional) Add a comment
5. Click "Finish"
6. See "Thank you!" message

Check the admin dashboard:
1. Go to http://localhost:3000/admin/lob
2. You should see your feedback reflected in the Norican box
3. Try navigating to MtM tab

## Step 5: Deploy to Vercel (5 minutes)

### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
5. Add Environment Variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
6. Click "Deploy"
7. Wait ~2 minutes for deployment

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then:
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your Supabase anon key

# Deploy to production
vercel --prod
```

## Step 6: Test Production (3 minutes)

After deployment completes, Vercel will give you a URL like:
`https://1-click-xxx.vercel.app`

Test your production deployment:

### Test Feedback Collection
```
https://your-domain.vercel.app/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican
```

1. ✅ Page loads quickly (< 2 seconds)
2. ✅ Stars display with rating highlighted
3. ✅ Click different star updates rating
4. ✅ After 3 seconds, comment box appears
5. ✅ Click "Finish" shows thank you

### Test Admin Dashboard
```
https://your-domain.vercel.app/admin/lob
```

1. ✅ All 5 LoB boxes display
2. ✅ Gauges show with correct colors
3. ✅ Your test feedback appears
4. ✅ Navigation to MtM works

### Test on Mobile
1. Open on your phone
2. ✅ Everything works and looks good
3. ✅ Touch targets are easy to tap
4. ✅ Text is readable

## Example URLs for Testing

### Feedback Collection URLs

**5-Star for Norican:**
```
/feedback/?r=5&utm_source=CRM&utm_medium=email&utm_campaign=Newsletter&utm_id=NO-Shutdown&utm_term=Norican
```

**1-Star for DISA:**
```
/feedback/?r=1&utm_source=CRM&utm_medium=email&utm_campaign=Newsletter&utm_id=DISA-Oct&utm_term=DISA
```

**4-Star for Monitizer Signup:**
```
/feedback/?r=4&utm_source=CRM&utm_medium=email&utm_campaign=Signup&utm_id=MON-Welcome&utm_term=Monitizer
```

**3-Star for StrikoWestofen Inquiry:**
```
/feedback/?r=3&utm_source=CRM&utm_medium=email&utm_campaign=Inquiry&utm_id=SW-Contact&utm_term=StrikoWestofen
```

**5-Star for Wheelabrator:**
```
/feedback/?r=5&utm_source=CRM&utm_medium=email&utm_campaign=Newsletter&utm_id=WH-News&utm_term=Wheelabrator
```

### Admin URLs

- **LoB Dashboard**: `/admin/lob`
- **MtM Dashboard**: `/admin/mtm`
- **Auto-redirect**: `/admin` → `/admin/lob`

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Can't Connect to Database
- Check your Supabase project is active (not paused)
- Verify environment variables are correct
- Check database table exists
- Test connection in Supabase dashboard

### API Returns 500 Error
- Check Vercel function logs in dashboard
- Verify environment variables are set in Vercel
- Make sure table schema matches exactly

### Stars Don't Update
- Check browser console for errors (F12)
- Verify JavaScript is enabled
- Try hard refresh (Ctrl+Shift+R)

### Dashboard Shows No Data
- Make sure you've submitted test feedback
- Check Supabase table has data
- Verify API endpoints return data (use browser dev tools)

## What's Next?

### Integrate with Your Email System
1. Generate feedback URLs with your CRM
2. Include rating parameter (r=1 to r=5)
3. Add UTM parameters for tracking
4. Send in emails to customers

### Monitor Feedback
1. Check admin dashboard regularly
2. Watch for low ratings (red gauges)
3. Read comments for insights
4. Track trends over time

### Optional Enhancements
- Add authentication to admin dashboard
- Export feedback data to CSV
- Set up email alerts for low ratings
- Add more analytics and charts
- Implement A/B testing

## Support & Resources

- **README.md**: Detailed setup instructions
- **DEPLOYMENT.md**: Complete deployment guide
- **TESTING.md**: Testing checklist
- **DEMO.md**: Feature showcase
- **IMPLEMENTATION_SUMMARY.md**: Technical details

## Quick Reference

### Useful Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run linter
```

### Important Files
- `.env.local` - Environment variables (never commit!)
- `pages/feedback.js` - Feedback collection page
- `pages/admin/lob.js` - LoB dashboard
- `pages/admin/mtm.js` - MtM dashboard
- `pages/api/feedback/` - API endpoints
- `components/BentoBox.js` - Gauge component

### Default Values
- **LoB Terms**: Norican, Monitizer, DISA, StrikoWestofen, Wheelabrator
- **MtM Campaigns**: Newsletter, Signup, Inquiry
- **Color Thresholds**: Red (1.0-2.9), Orange (3.0-3.7), Green (3.8-5.0)
- **Auto-refresh**: 30 seconds
- **Comment delay**: 3 seconds

## Congratulations! 🎉

Your 1-Click Feedback System is now live and ready to collect feedback from your email campaigns!

**Total Time**: ~20 minutes
**Total Cost**: $0 (using free tiers)
**Maintenance**: Minimal

Happy collecting feedback! ⭐⭐⭐⭐⭐
