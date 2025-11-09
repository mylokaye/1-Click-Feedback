# Demo & Quick Start

This guide demonstrates the 1-Click Feedback System features.

## Quick Demo (Without Database)

To see the UI and functionality without setting up Supabase:

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the pages:**
   - Feedback page: http://localhost:3000/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican
   - Admin LoB: http://localhost:3000/admin/lob
   - Admin MtM: http://localhost:3000/admin/mtm

**Note:** API calls will fail without Supabase configuration, but you can see the UI, animations, and interactions.

## Features Showcase

### Feedback Collection Page

#### URL Examples:
```
# 5-star rating for Norican Newsletter
http://localhost:3000/feedback/?r=5&utm_campaign=Newsletter&utm_term=Norican

# 1-star rating
http://localhost:3000/feedback/?r=1&utm_campaign=Newsletter&utm_term=DISA

# 4-star rating
http://localhost:3000/feedback/?r=4&utm_campaign=Signup&utm_term=Monitizer
```

#### User Flow:
1. **Stage 1 (0-3 seconds):**
   - Page loads instantly
   - Shows "Thanks, we've recorded your feedback!"
   - Displays 5 stars with the rating highlighted in gold
   - User can click any star to change rating
   - Rating is sent to API immediately

2. **Stage 2 (After 3 seconds):**
   - Stars shrink
   - Message appears: "If you have 10 seconds, additional feedback will help us"
   - Textarea appears for optional comments
   - "Finish" button displayed

3. **Stage 3:**
   - After clicking Finish, shows large "Thank you!" message
   - Clean, minimal design

### Admin Dashboard

#### Line of Business (LoB) - `/admin/lob`
Displays 5 bento boxes with metrics for:
- Norican
- Monitizer
- DISA
- StrikoWestofen
- Wheelabrator

Each box shows:
- Gauge visualization with color coding:
  - 🟢 Green (3.8-5.0): Great performance
  - 🟠 Orange (3.0-3.7): Okay performance
  - 🔴 Red (1.0-2.9): Needs improvement
  - ⚪ Gray (0): No data yet
- Average rating (X.X/5)
- Total feedback count
- Last updated timestamp

#### Moments that Matter (MtM) - `/admin/mtm`
Displays 3 bento boxes with metrics for:
- Newsletter
- Signup
- Inquiry

Same gauge visualization and metrics as LoB page.

## Design Features

### Visual Effects
- **Animated Gradient Background**: 5 colorful orbs moving slowly
- **Star Field**: 150 animated stars in the background
- **Bottom Glow**: Subtle glow effect at the bottom of the page
- **Smooth Transitions**: All interactions have smooth animations

### Responsive Design
- Mobile-first approach
- Works on all screen sizes (phone, tablet, desktop)
- Touch-friendly star rating on mobile
- Adaptive grid layouts on admin dashboard

### Color Palette
- Primary: Blues and purples
- Background: Dark slate tones
- Accents: White text with proper contrast
- Status colors: Green, orange, red for ratings

## Technical Highlights

### Performance
- Page loads in < 2 seconds
- Static generation where possible
- Optimized images and assets
- Minimal JavaScript bundle

### Architecture
- **Frontend**: Next.js with React
- **API**: Serverless functions (Next.js API routes)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

### API Structure
```
POST   /api/feedback          - Create new feedback entry
PUT    /api/feedback/:id      - Update existing feedback
GET    /api/feedback/stats/lob - Get LoB statistics
GET    /api/feedback/stats/mtm - Get MtM statistics
```

## Example Data Structure

### Feedback Entry
```json
{
  "id": 1,
  "rating": 5,
  "timestamp": "2024-11-02T10:30:00Z",
  "utm_campaign": "Newsletter",
  "utm_term": "Norican",
  "utm_content": "october-edition",
  "comments": "Excellent newsletter content!"
}
```

### Statistics Response
```json
{
  "Norican": {
    "term": "Norican",
    "average": "4.2",
    "count": 15,
    "lastUpdated": "2024-11-02T10:30:00Z"
  },
  "Monitizer": {
    "term": "Monitizer",
    "average": "3.8",
    "count": 8,
    "lastUpdated": "2024-11-02T09:15:00Z"
  }
}
```

## Customization

### Adding New LoB Terms
Edit `/pages/api/feedback/stats/lob.js`:
```javascript
const lobTerms = ['Norican', 'Monitizer', 'DISA', 'StrikoWestofen', 'Wheelabrator', 'NewTerm'];
```

### Adding New MtM Campaigns
Edit `/pages/api/feedback/stats/mtm.js`:
```javascript
const mtmCampaigns = ['Newsletter', 'Signup', 'Inquiry', 'NewCampaign'];
```

### Adjusting Color Thresholds
Edit `/components/BentoBox.js`:
```javascript
const getColor = (avg) => {
  if (avg >= 4.0) return { bg: '#22c55e', text: '#ffffff' }; // Green
  if (avg >= 3.0) return { bg: '#f97316', text: '#ffffff' }; // Orange
  return { bg: '#ef4444', text: '#ffffff' }; // Red
};
```

### Changing Auto-Refresh Interval
Edit `/pages/admin/lob.js` or `/pages/admin/mtm.js`:
```javascript
// Current: 30 seconds (30000ms)
const interval = setInterval(fetchStats, 30000);

// Change to 60 seconds:
const interval = setInterval(fetchStats, 60000);
```

## Troubleshooting

### Dev Server Won't Start
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try again
npm run dev
```

### Pages Not Loading
- Check console for errors (F12 in browser)
- Verify you're using the correct URL format
- Clear browser cache

### API Errors
- Ensure environment variables are set (`.env.local`)
- Check Supabase credentials
- Verify database table exists

## Next Steps

1. **Set up Supabase** (see README.md)
2. **Deploy to Vercel** (see DEPLOYMENT.md)
3. **Test thoroughly** (see TESTING.md)
4. **Share feedback URLs** via email campaigns

## Support

For issues or questions:
1. Check the documentation (README.md, DEPLOYMENT.md, TESTING.md)
2. Review console logs for errors
3. Test API endpoints with curl
4. Contact the development team
