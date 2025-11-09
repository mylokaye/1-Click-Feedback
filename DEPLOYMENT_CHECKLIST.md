# Deployment Checklist

Use this checklist to verify your deployment is working correctly.

## Pre-Deployment Checklist

### Local Setup
- [ ] Node.js 18+ installed
- [ ] npm installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with Supabase credentials
- [ ] Local build successful (`npm run build`)
- [ ] Local dev server works (`npm run dev`)

### Supabase Setup
- [ ] Supabase account created
- [ ] New project created
- [ ] Database provisioned (wait ~2 minutes)
- [ ] SQL migration executed (`supabase/migrations/20240101000000_initial_schema.sql`)
- [ ] Feedback table created successfully
- [ ] Indexes created successfully
- [ ] Project URL copied
- [ ] Anon/Public key copied

### Vercel Setup
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Environment variables added:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Deployment Checklist

### Build Verification
- [ ] Vercel build started
- [ ] Build completed without errors
- [ ] No TypeScript errors
- [ ] All pages compiled successfully
- [ ] Deployment URL generated

### Post-Deployment Testing

#### 1. Test Feedback Collection Page
Visit: `https://your-domain.vercel.app/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican`

- [ ] Page loads in < 2 seconds
- [ ] 5 stars displayed
- [ ] Rating (5) highlighted in gold
- [ ] Background animation visible
- [ ] "Thanks, we've recorded your feedback!" message shown
- [ ] Can click different stars to change rating
- [ ] After 3 seconds, comment section appears
- [ ] Can enter text in comment box
- [ ] "Finish" button visible
- [ ] Clicking "Finish" shows "Thank you!" message

#### 2. Test API Endpoints

**Create Feedback:**
```bash
curl -X POST https://your-domain.vercel.app/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "utm_campaign": "Newsletter", "utm_term": "Norican", "comments": "Test feedback"}'
```
- [ ] Returns 201 status code
- [ ] Returns success message with ID

**Get LoB Stats:**
```bash
curl https://your-domain.vercel.app/api/feedback/stats/lob
```
- [ ] Returns 200 status code
- [ ] Returns JSON with all 5 LoB terms
- [ ] Each term has average, count, lastUpdated

**Get MtM Stats:**
```bash
curl https://your-domain.vercel.app/api/feedback/stats/mtm
```
- [ ] Returns 200 status code
- [ ] Returns JSON with all 3 MtM campaigns
- [ ] Each campaign has average, count, lastUpdated

#### 3. Test Admin Dashboard - LoB

Visit: `https://your-domain.vercel.app/admin/lob`

- [ ] Page loads quickly
- [ ] All 5 LoB bento boxes displayed
- [ ] Each box shows:
  - [ ] Gauge visualization
  - [ ] Average rating (X.X/5)
  - [ ] Feedback count
  - [ ] Last updated timestamp
- [ ] Gauges show correct colors:
  - [ ] Green (3.8-5.0)
  - [ ] Orange (3.0-3.7)
  - [ ] Red (1.0-2.9)
  - [ ] Gray (0 - no data)
- [ ] Navigation tabs visible (LoB, MtM)
- [ ] Auto-refresh works (check after 30 seconds)
- [ ] Responsive on mobile

#### 4. Test Admin Dashboard - MtM

Visit: `https://your-domain.vercel.app/admin/mtm`

- [ ] Page loads quickly
- [ ] All 3 MtM bento boxes displayed
- [ ] Each box shows metrics correctly
- [ ] Navigation between LoB and MtM works
- [ ] Responsive on mobile

#### 5. Test Different Ratings

Test feedback with different ratings:

**1-Star (Should show RED):**
```
/feedback/?r=1&utm_campaign=Newsletter&utm_term=DISA
```
- [ ] 1 star highlighted
- [ ] Data appears in admin dashboard
- [ ] DISA shows red gauge (if average < 3.0)

**3-Star (Should show ORANGE):**
```
/feedback/?r=3&utm_campaign=Inquiry&utm_term=StrikoWestofen
```
- [ ] 3 stars highlighted
- [ ] Data appears in admin dashboard
- [ ] Shows orange gauge (if 3.0 ≤ average < 3.8)

**5-Star (Should show GREEN):**
```
/feedback/?r=5&utm_campaign=Signup&utm_term=Wheelabrator
```
- [ ] 5 stars highlighted
- [ ] Data appears in admin dashboard
- [ ] Shows green gauge (if average ≥ 3.8)

#### 6. Test Mobile Responsiveness

Test on mobile device or using browser dev tools:

- [ ] Feedback page mobile-friendly
- [ ] Stars easy to tap
- [ ] Text readable
- [ ] Comment box works
- [ ] Admin dashboard grid adapts
- [ ] Navigation works on mobile
- [ ] Gauges scale properly

#### 7. Test Browser Compatibility

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

## Performance Checklist

### Page Load Times
- [ ] Feedback page: < 2 seconds
- [ ] Admin LoB page: < 3 seconds
- [ ] Admin MtM page: < 3 seconds

### API Response Times
- [ ] POST /api/feedback: < 1 second
- [ ] GET /api/feedback/stats/lob: < 2 seconds
- [ ] GET /api/feedback/stats/mtm: < 2 seconds

## Security Checklist

- [ ] Environment variables not exposed in client-side code
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Supabase API keys not committed to Git
- [ ] `.env.local` in `.gitignore`
- [ ] Consider implementing Row Level Security (RLS) in Supabase
- [ ] Consider adding authentication to admin dashboard
- [ ] Consider adding rate limiting to API routes

## Production Checklist

### DNS & Domain
- [ ] Custom domain configured (optional)
- [ ] DNS records updated (optional)
- [ ] SSL certificate active (automatic with Vercel)

### Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking set up
- [ ] Database monitoring in Supabase

### Documentation
- [ ] Team knows how to access admin dashboard
- [ ] Feedback URL structure documented
- [ ] UTM parameters documented
- [ ] Emergency contacts documented

## Troubleshooting

### If Feedback Page Doesn't Work
1. Check browser console for errors
2. Verify environment variables in Vercel
3. Check Supabase connection
4. Test API endpoint directly

### If Admin Dashboard Shows No Data
1. Submit test feedback first
2. Check Supabase database has data
3. Verify API endpoints return data
4. Check network tab in browser dev tools

### If Build Fails
1. Check Vercel build logs
2. Verify Node.js version (should be 18+)
3. Check package.json dependencies
4. Try building locally

### If API Returns Errors
1. Check Vercel function logs
2. Verify Supabase credentials
3. Check database table exists
4. Verify table schema matches

## Success Criteria

Your deployment is successful when:
- ✅ All checklist items are completed
- ✅ Feedback can be submitted successfully
- ✅ Admin dashboard displays data correctly
- ✅ All API endpoints respond correctly
- ✅ Mobile experience works well
- ✅ Page load times are acceptable
- ✅ No errors in browser console or Vercel logs

## Next Steps

After successful deployment:
1. Share feedback URLs with your team
2. Integrate feedback URLs into email campaigns
3. Monitor the admin dashboard regularly
4. Set up alerts for low ratings (optional)
5. Export data for analysis (optional)

## Support

For issues during deployment:
1. Review this checklist
2. Check [DEPLOY.md](DEPLOY.md)
3. Check [DEPLOYMENT.md](DEPLOYMENT.md)
4. Review Vercel logs
5. Check Supabase logs
