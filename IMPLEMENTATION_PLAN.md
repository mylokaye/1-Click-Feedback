# Email Newsletter Feedback System - Project Brief

## Overview
A simple internal web application for collecting 1-5 star feedback from email newsletter recipients. Single admin user system with automatic UTM parameter tracking via CRM-generated links.

**Domain example:** 1click-feedback.vercel.app

---

## System Architecture

Github: https://github.com/pattens-tech/1-click

### Frontend (Public)
Single feedback collection page accessible

### Backend (Admin)
Dashboard for viewing aggregated feedback data by Line of Business (LoB) and Moments-to-Matter (MtM) metrics

### Database
Supabase Postgres storing all feedback entries with UTM parameters

---

## Frontend: Feedback Collection Page

### Frontend: Design

I've provided you with a ready to go template design for you to customize for this project. Only change what you need to.

### URL Structure
```
xxx-feedback.vercel.app/feedback/?r=[1-5]&utm_source=CRM&utm_medium=email&utm_campaign=[campaign]&utm_id=[id]&utm_term=[term]
```

### Example URLs
```
xxx-feedback.vercel.app/feedback/?r=5&utm_source=CRM&utm_medium=email&utm_campaign=newsletter&utm_id=NO-Shutdown&utm_term=Norican
xxx-feedback.vercel.app/feedback/?r=1&utm_source=CRM&utm_medium=email&utm_campaign=newsletter&utm_id=NO-Shutdown&utm_term=Norican
```

### User Experience Flow

**Stage 1: Initial Rating Display (0-3 seconds)**
- Large heading: "Thanks, we've recorded your feedback!"
- Display 5 stars showing user's rating (1-5 stars in yellow)
- User can click different star to change rating
- Rating is recorded immediately on page load

**Stage 2: Optional Comment (After 3 seconds)**
- Star rating reduces in size
- Message appears: "If you have 10 seconds, additional feedback will help us"
- Text area appears for optional comments
- Large "Finish" button displayed

**Stage 3: Completion**
- After clicking "Finish" button
- Display large "Thank you" heading
- No other elements visible

### Data Captured on Page Load
- `rating`: 1-5 (from URL parameter `r`)
- `utm_campaign`: Campaign identifier
- `utm_content`: Content type
- `utm_term`: Line of Business identifier
- `timestamp`: Server-generated
- `comments`: Optional (captured if user provides)

**Important:** Rating is logged immediately when URL is accessed, even if user doesn't submit additional comments, database entry must be updated if user changes their rating from the initial URL rating they provided.

---

## Backend: Admin Dashboard

### URL
```
/admin/
```

### Authentication
- No username/password required initially
- Single internal user access

### Dashboard Layout

**Page Title:** "LoB" (Line of Business)

**Section 1: Line of Business Metrics (5 Bento Boxes)**

Display metrics for each LoB term:
1. Norican
2. Monitizer
3. DISA
4. StrikoWestofen
5. Wheelabrator

**Each Bento Box Contains:**
- Term name as header
- Gauge showing average rating with color coding:
  - Red: 1.0-2.9
  - Orange: 3.0-3.7
  - Green: 3.8-5.0
- Summary text: e.g., "3.5/5"
- Last updated date & time

---

**Page Title:** "MtM" (Moments that Matter)

**Section 2: Campaign Metrics (3 Bento Boxes)**

Display metrics for each campaign:
1. Newsletter
2. Signup
3. Inquiry

**Each Bento Box Contains:**
- Campaign name as header
- Gauge showing average rating with same color coding
- Summary text: e.g., "4.2/5"
- Last updated date & time

---

## Database Schema

### Table: `feedback`

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL PRIMARY KEY | Auto-increment |
| rating | INTEGER | User rating (1-5) |
| timestamp | TIMESTAMP | Auto-generated on insert |
| utm_campaign | TEXT | Campaign identifier |
| utm_term | TEXT | Line of Business (nullable) |
| utm_content | TEXT | Content type (nullable) |
| comments | TEXT | User comments (nullable) |

---

## Rating Calculation

### Formula
```
Average Rating = Sum of all ratings / Number of ratings
Example: (5 + 4 + 3 + 5 + 4) / 5 = 4.2 out of 5
```

### Color Coding
- **Red:** 1.0 - 2.9
- **Orange:** 3.0 - 3.7
- **Green:** 3.8 - 5.0

---

## Design Specifications

### Visual Style
- Clean and modern aesthetic
- Professional but friendly
- Mobile-responsive (mobile-first)
- Fast loading performance

### Color Palette
- Primary: Blue tones
- Professional base colors
- High contrast for readability
- Rating colors: Red, Orange, Green (as per color coding)

### Typography
- Font family: Roboto
- Large, readable sizes
- Clear hierarchy
- Accessible mobile-friendly sizing

---

## User Flows

### Flow 1: Customer Provides Feedback
1. Receives email with feedback link containing rating parameter (r=1 to r=5)
2. Clicks link (e.g., `xxx-feedback.vercel.app/feedback/?r=5&utm_term=Norican...`)
3. Rating automatically recorded with UTM parameters and timestamp
4. Sees thank you page with star rating displayed
5. Can optionally change rating by clicking different star
6. After 3 seconds, sees option to add text comments
7. Clicks "Finish" button (or skips)
8. Sees final thank you message

### Flow 2: Admin Reviews Feedback
1. Navigates to `/admin/`
2. Views LoB section showing 5 bento boxes with gauges
3. Views MtM section showing 3 bento boxes with gauges
4. Sees average ratings, totals, and last updated timestamps
5. Reviews any comments provided by users

---

## Technical Requirements

### Frontend
- Mobile-first responsive design
- Fast page load (< 2 seconds)
- Star rating component (interactive)
- Delayed display of comment section (3 second timer)
- Form submission handling

### Backend
- API endpoint to receive and store feedback
- API endpoint to retrieve aggregated statistics
- Real-time calculation of average ratings
- Group data by utm_term (LoB) and utm_campaign (MtM)

### Database
- Automatic timestamp generation
- Support for nullable fields
- Efficient querying for aggregations

---

## Success Criteria

✓ User can provide feedback with 1 click from email
✓ Rating is recorded immediately on page load
✓ All UTM parameters automatically captured and stored
✓ Thank you page loads in under 2 seconds
✓ Admin dashboard accurately displays average ratings by LoB and MtM
✓ Color-coded gauges reflect rating ranges correctly
✓ Optional comments are stored when provided
✓ Data persists indefinitely in database
✓ Mobile-responsive on all devices

---

## Out of Scope

- Link generation (handled by CRM)
- Email sending functionality
- User authentication for feedback submission
- Advanced charts and analytics
- Real-time notifications
- Third-party integrations
- Multi-user admin system
- Password protection for admin (initial version)

---

## Notes

- System designed for single internal admin user
- CRM automatically appends UTM parameters to all links
- No hardcoded UTM parameter filtering - capture all parameters
- Email links are standard HTML (no JavaScript required)
- Comments are always optional
- Focus on simplicity and speed