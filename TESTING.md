# Testing Checklist

This document provides a comprehensive testing checklist for the 1-Click Feedback System.

## Pre-Deployment Testing

### Build Test
- [x] `npm run build` completes successfully
- [x] No TypeScript errors
- [x] All pages compile without errors
- [x] All API routes are generated

## Functional Testing

### 1. Feedback Collection Page (`/feedback`)

#### URL Parameter Parsing
- [ ] Test with valid rating: `/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican`
  - Rating displays correctly
  - UTM parameters captured
- [ ] Test with invalid rating: `/feedback/?r=10`
  - System handles gracefully
- [ ] Test with missing parameters: `/feedback/`
  - Page loads without errors
- [ ] Test with special characters in UTM params
  - Data saved correctly

#### Stage 1: Rating Display (0-3 seconds)
- [ ] "Thanks, we've recorded your feedback!" heading displays
- [ ] Stars show with correct rating highlighted
- [ ] Stars are yellow/gold color (#fbbf24)
- [ ] Hover effect on stars works
- [ ] Rating is recorded to database immediately on page load
- [ ] Verify database entry created with correct timestamp

#### Interactive Star Rating
- [ ] Click on different star changes rating
- [ ] Hover shows preview of new rating
- [ ] Database updates when rating changes
- [ ] Multiple rating changes work correctly
- [ ] Stars have smooth transition animations

#### Stage 2: Comment Section (After 3 seconds)
- [ ] Stars reduce to smaller size after 3 seconds
- [ ] Message "If you have 10 seconds, additional feedback will help us" appears
- [ ] Textarea appears for comments
- [ ] Placeholder text visible
- [ ] "Finish" button displayed
- [ ] Textarea accepts input
- [ ] Comments save to database when submitted

#### Stage 3: Thank You
- [ ] Large "Thank you!" heading displays after clicking Finish
- [ ] Page is clean/minimal
- [ ] No JavaScript errors in console

### 2. API Endpoints

#### POST /api/feedback
Test with curl or Postman:
```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "utm_campaign": "Newsletter",
    "utm_term": "Norican",
    "utm_content": "test",
    "comments": "Great newsletter!"
  }'
```

Expected response:
```json
{
  "success": true,
  "id": 1,
  "message": "Feedback recorded successfully"
}
```

Tests:
- [ ] Returns 201 on success
- [ ] Returns ID of created record
- [ ] Rating validation (1-5)
- [ ] Returns 400 for invalid rating
- [ ] Handles missing optional fields
- [ ] Timestamp auto-generated
- [ ] Database entry created correctly

#### PUT /api/feedback/:id
```bash
curl -X PUT http://localhost:3000/api/feedback/1 \
  -H "Content-Type: application/json" \
  -d '{"rating": 4, "comments": "Updated comment"}'
```

Tests:
- [ ] Updates existing record
- [ ] Returns 200 on success
- [ ] Returns 404 for non-existent ID
- [ ] Validates rating if provided
- [ ] Handles partial updates (only rating or only comments)

#### GET /api/feedback/stats/lob
```bash
curl http://localhost:3000/api/feedback/stats/lob
```

Expected response format:
```json
{
  "Norican": {
    "term": "Norican",
    "average": "4.2",
    "count": 5,
    "lastUpdated": "2024-11-02T10:30:00Z"
  },
  ...
}
```

Tests:
- [ ] Returns stats for all 5 LoB terms (Norican, Monitizer, DISA, StrikoWestofen, Wheelabrator)
- [ ] Average calculated correctly
- [ ] Count is accurate
- [ ] Last updated timestamp is correct
- [ ] Returns 0 for terms with no data
- [ ] Response time < 500ms

#### GET /api/feedback/stats/mtm
```bash
curl http://localhost:3000/api/feedback/stats/mtm
```

Tests:
- [ ] Returns stats for all 3 campaigns (Newsletter, Signup, Inquiry)
- [ ] Average calculated correctly
- [ ] Count is accurate
- [ ] Last updated timestamp is correct
- [ ] Returns 0 for campaigns with no data
- [ ] Response time < 500ms

### 3. Admin Dashboard - LoB Page (`/admin/lob`)

#### Layout
- [ ] Page title "Line of Business (LoB)" displays
- [ ] Navigation shows LoB (active) and MtM links
- [ ] 5 bento boxes displayed
- [ ] Bento boxes show: Norican, Monitizer, DISA, StrikoWestofen, Wheelabrator
- [ ] Responsive grid layout works

#### Bento Box Components
For each box:
- [ ] Header shows term name
- [ ] Gauge displays correctly
- [ ] Gauge color matches rating:
  - Red (1.0-2.9)
  - Orange (3.0-3.7)
  - Green (3.8-5.0)
  - Gray (no data)
- [ ] Average rating displayed as "X.X/5"
- [ ] Total feedback count shown
- [ ] Last updated timestamp formatted correctly
- [ ] Hover effect works

#### Data Refresh
- [ ] Data loads on page load
- [ ] Loading spinner shows while fetching
- [ ] Auto-refresh every 30 seconds
- [ ] Error handling works if API fails
- [ ] Retry button appears on error

### 4. Admin Dashboard - MtM Page (`/admin/mtm`)

#### Layout
- [ ] Page title "Moments that Matter (MtM)" displays
- [ ] Navigation shows LoB and MtM (active) links
- [ ] 3 bento boxes displayed
- [ ] Bento boxes show: Newsletter, Signup, Inquiry
- [ ] Responsive grid layout works

#### Bento Box Components
Same tests as LoB page

#### Navigation
- [ ] Clicking "LoB" navigates to /admin/lob
- [ ] Clicking "MtM" stays on /admin/mtm
- [ ] Navigation state updates correctly

### 5. Admin Index Redirect (`/admin`)
- [ ] `/admin` redirects to `/admin/lob`
- [ ] No flash of unstyled content
- [ ] Redirect is instant

## Design & UI Testing

### Visual Design
- [ ] Background gradient animations work
- [ ] Stars animation in background works
- [ ] Bottom glow effect displays
- [ ] Color palette matches template
- [ ] Typography is consistent
- [ ] No layout shifts on page load

### Responsive Design
Test on:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

For each screen size:
- [ ] Layout adapts correctly
- [ ] Text is readable
- [ ] Touch targets are adequate (min 44x44px)
- [ ] No horizontal scrolling
- [ ] Navigation works

### Accessibility
- [ ] Keyboard navigation works
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on images
- [ ] ARIA labels where needed

## Performance Testing

### Page Load Times
- [ ] /feedback page loads in < 2 seconds
- [ ] /admin/lob loads in < 2 seconds
- [ ] /admin/mtm loads in < 2 seconds
- [ ] API responses < 500ms

### Network Performance
- [ ] Test with slow 3G
- [ ] Test with throttled connection
- [ ] Images optimized
- [ ] CSS/JS bundled efficiently

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Integration Testing

### End-to-End User Flow
1. [ ] User clicks email link with rating
2. [ ] Feedback page loads with stars
3. [ ] Rating recorded to database
4. [ ] User changes rating by clicking star
5. [ ] Database updates
6. [ ] After 3 seconds, comment section appears
7. [ ] User enters comment
8. [ ] User clicks Finish
9. [ ] Thank you message appears
10. [ ] Check database has complete entry
11. [ ] Check admin dashboard shows updated stats

### Admin Flow
1. [ ] Admin visits /admin
2. [ ] Redirects to /admin/lob
3. [ ] Stats load and display correctly
4. [ ] Click MtM navigation
5. [ ] MtM page loads with stats
6. [ ] Auto-refresh updates after 30 seconds
7. [ ] Data persists across page refreshes

## Edge Cases

- [ ] Very long comments (> 1000 characters)
- [ ] Special characters in comments (emoji, etc.)
- [ ] Multiple simultaneous submissions
- [ ] Rapid rating changes
- [ ] Network timeout during submission
- [ ] Invalid database credentials
- [ ] Database connection lost
- [ ] Empty/null values in database
- [ ] Future date timestamps

## Security Testing

- [ ] SQL injection attempts in comments
- [ ] XSS attempts in comments
- [ ] CORS policy enforced
- [ ] Environment variables not exposed
- [ ] API rate limiting (if implemented)
- [ ] Input validation on all endpoints

## Database Testing

### Supabase
- [ ] Table created successfully
- [ ] Constraints work (rating 1-5)
- [ ] Timestamps auto-generate
- [ ] NULL values handled for optional fields
- [ ] Query performance is acceptable
- [ ] Connection pool doesn't exhaust

### Sample Data
Create test data:
```sql
INSERT INTO feedback (rating, utm_campaign, utm_term, comments) VALUES
(5, 'Newsletter', 'Norican', 'Excellent!'),
(4, 'Newsletter', 'Norican', 'Good job'),
(3, 'Newsletter', 'DISA', 'Okay'),
(5, 'Signup', 'Monitizer', 'Love it!'),
(2, 'Inquiry', 'Wheelabrator', 'Needs work');
```

Verify:
- [ ] Admin dashboard shows correct averages
- [ ] Color coding is accurate
- [ ] Counts are correct

## Post-Deployment Testing

After deploying to Vercel:
- [ ] All tests above pass on production URL
- [ ] Environment variables configured correctly
- [ ] Supabase connection works
- [ ] Custom domain works (if configured)
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Analytics tracking (if enabled)

## Regression Testing

After any code changes:
- [ ] Run full test suite
- [ ] Verify no existing functionality broken
- [ ] Test all user flows again
- [ ] Check API endpoints still work
- [ ] Verify database queries unchanged

## Test Example URLs

```
# 5-star rating for Norican Newsletter
/feedback/?r=5&utm_source=CRM&utm_medium=email&utm_campaign=Newsletter&utm_id=NO-Shutdown&utm_term=Norican

# 1-star rating for Norican Newsletter  
/feedback/?r=1&utm_source=CRM&utm_medium=email&utm_campaign=Newsletter&utm_id=NO-Shutdown&utm_term=Norican

# 4-star rating for DISA Signup
/feedback/?r=4&utm_source=CRM&utm_medium=email&utm_campaign=Signup&utm_id=DISA-Welcome&utm_term=DISA

# 3-star rating for Monitizer Inquiry
/feedback/?r=3&utm_source=CRM&utm_medium=email&utm_campaign=Inquiry&utm_id=MON-Contact&utm_term=Monitizer
```
