# One-Click Deploy Guide

This guide provides the fastest way to deploy the 1-Click Feedback System to Vercel and Supabase.

## 🚀 Quick Deploy (5 minutes)

### Step 1: Deploy to Vercel (2 minutes)

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpattens-tech%2F1-click&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required%20for%20database%20connection&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started&project-name=1-click-feedback&repository-name=1-click-feedback)

1. Click the button above
2. Sign in to Vercel (or create an account)
3. Vercel will fork the repository to your GitHub account
4. Enter placeholder values for environment variables (you'll update these next):
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://placeholder.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `placeholder-key`
5. Click "Deploy"
6. Wait ~2 minutes for the initial deployment

### Step 2: Set Up Supabase Database (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for provisioning (~2 minutes)
3. Go to SQL Editor
4. Copy and paste the schema from `supabase/migrations/20240101000000_initial_schema.sql`
5. Click "Run"
6. Go to Settings > API and copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public key** (starts with `eyJ...`)

### Step 3: Update Environment Variables (1 minute)

1. Go to your Vercel project dashboard
2. Click "Settings" > "Environment Variables"
3. Update the values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Click "Save"
5. Go to "Deployments" tab
6. Click the three dots on the latest deployment
7. Click "Redeploy"

### Step 4: Test Your Deployment

Visit your Vercel URL (e.g., `https://your-project.vercel.app`):

✅ **Test Feedback Page:**
```
https://your-project.vercel.app/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican
```

✅ **Test Admin Dashboard:**
```
https://your-project.vercel.app/admin/lob
```

## 🛠️ Alternative: Manual Setup

### Option A: Using Setup Script

```bash
# Clone the repository
git clone https://github.com/pattens-tech/1-click.git
cd 1-click

# Run setup script
./scripts/setup.sh

# Follow the prompts to configure Supabase credentials
```

### Option B: Manual Installation

```bash
# Clone the repository
git clone https://github.com/pattens-tech/1-click.git
cd 1-click

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your Supabase credentials
nano .env.local

# Build the project
npm run build

# Start development server
npm run dev
```

### Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 📋 Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key | `eyJhbGc...` |

## 🔐 Security Checklist

Before going to production:

- [ ] Review and update Supabase Row Level Security (RLS) policies
- [ ] Add authentication to admin dashboard
- [ ] Configure custom domain in Vercel
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up monitoring and alerts
- [ ] Configure CORS if needed
- [ ] Review and limit API rate limits

## 🐛 Troubleshooting

### Deployment Fails

**Issue**: Vercel deployment fails with build error

**Solution**:
1. Check build logs in Vercel dashboard
2. Ensure Node.js version is 18+ (set in Vercel settings)
3. Verify all dependencies are in package.json
4. Try building locally: `npm run build`

### Database Connection Error

**Issue**: API returns 500 error or "Connection failed"

**Solution**:
1. Verify Supabase credentials are correct in Vercel
2. Check Supabase project is active (not paused)
3. Ensure feedback table exists in database
4. Test connection from Supabase dashboard
5. Check Vercel function logs for detailed error

### Environment Variables Not Working

**Issue**: Changes to environment variables not reflected

**Solution**:
1. Redeploy the project after changing variables
2. Make sure variable names match exactly (case-sensitive)
3. Clear browser cache
4. Check variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Page Not Loading

**Issue**: Vercel URL returns 404 or blank page

**Solution**:
1. Check deployment status in Vercel dashboard
2. View deployment logs for errors
3. Ensure build completed successfully
4. Check browser console for JavaScript errors

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Project README](README.md)
- [Detailed Deployment Guide](DEPLOYMENT.md)
- [Quick Start Guide](QUICK_START.md)

## 🆘 Support

For issues:
1. Check the troubleshooting section above
2. Review Vercel deployment logs
3. Check Supabase logs and database
4. Review the detailed guides (DEPLOYMENT.md, QUICK_START.md)
5. Test API endpoints manually with curl

## 🎉 Success!

Once deployed, you can:
- Share feedback URLs in email campaigns
- Monitor feedback in the admin dashboard
- Track Line of Business (LoB) metrics
- Analyze Moments that Matter (MtM) campaigns

**Happy collecting feedback! ⭐⭐⭐⭐⭐**
