# Deployment Guide

This guide walks through deploying the 1-Click Feedback System to Vercel with Supabase.

> 🚀 **Quick Deploy**: For the fastest deployment method, see [DEPLOY.md](DEPLOY.md) which includes a one-click deploy button!

## Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com)
- Supabase account (sign up at supabase.com)

## Step 1: Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (usually 1-2 minutes)
3. Go to the SQL Editor in your Supabase dashboard
4. Run the migration from `supabase/migrations/20240101000000_initial_schema.sql` or use the following SQL:

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

> 💡 **Tip**: The migration file includes helpful indexes for better performance. See [supabase/README.md](supabase/README.md) for detailed Supabase setup instructions.

5. Go to Settings > API to find your:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key (starts with `eyJ...`)

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository (`pattens-tech/1-click`)
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key

6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts to:
# - Link to existing project or create new one
# - Configure settings
# - Add environment variables

# For production deployment
vercel --prod
```

### Option C: One-Click Deploy (Fastest)

Use the Deploy to Vercel button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpattens-tech%2F1-click&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required%20for%20database%20connection&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started&project-name=1-click-feedback&repository-name=1-click-feedback)

See [DEPLOY.md](DEPLOY.md) for the complete one-click deployment guide.

## Step 3: Configure Environment Variables

After deployment, add the environment variables:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add the following:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

4. Redeploy the project to apply the changes

## Step 4: Test the Deployment

### Test Feedback Page

1. Visit: `https://your-domain.vercel.app/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican`
2. Verify:
   - Page loads in < 2 seconds
   - 5 stars displayed with rating highlighted
   - After 3 seconds, comment section appears
   - Clicking different stars updates the rating
   - "Finish" button shows thank you message

### Test Admin Dashboard

1. Visit: `https://your-domain.vercel.app/admin/lob`
2. Verify:
   - All 5 LoB bento boxes displayed
   - Gauges show correct colors based on ratings
   - Last updated timestamps show

3. Visit: `https://your-domain.vercel.app/admin/mtm`
4. Verify:
   - All 3 MtM bento boxes displayed
   - Navigation between LoB and MtM works

### Test API Endpoints

```bash
# Create feedback
curl -X POST https://your-domain.vercel.app/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "utm_campaign": "Newsletter", "utm_term": "Norican"}'

# Get LoB stats
curl https://your-domain.vercel.app/api/feedback/stats/lob

# Get MtM stats
curl https://your-domain.vercel.app/api/feedback/stats/mtm
```

## Step 5: Custom Domain (Optional)

1. In Vercel project settings, go to "Domains"
2. Add your custom domain (e.g., `feedback.yourcompany.com`)
3. Follow Vercel's instructions to configure DNS

## Troubleshooting

### Environment Variables Not Working

- Make sure variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding environment variables
- Check Vercel deployment logs for errors

### Database Connection Errors

- Verify Supabase URL and anon key are correct
- Check Supabase project is active and not paused
- Ensure the feedback table exists in Supabase

### Build Failures

- Check Node.js version (should be 18.x or higher)
- Review build logs in Vercel dashboard
- Ensure all dependencies are in package.json

### API Route Errors

- Check Vercel function logs in the dashboard
- Verify CORS settings if accessing from different domains
- Ensure Supabase credentials are correctly configured

## Monitoring

### Vercel Analytics

1. Enable Vercel Analytics in project settings
2. Monitor page views, response times, and errors

### Supabase Monitoring

1. Check Supabase dashboard for:
   - Database size
   - API requests
   - Connection pool usage

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to Git
2. **API Keys**: Use Supabase Row Level Security (RLS) for production
3. **Rate Limiting**: Consider adding rate limiting to API routes
4. **CORS**: Configure CORS settings for production domains

## Support

For issues:
1. Check Vercel deployment logs
2. Review Supabase logs
3. Test API endpoints with curl/Postman
4. Contact support if needed
