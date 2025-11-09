# 1-Click Feedback System

Email newsletter feedback system with public feedback collection page and admin dashboard for viewing aggregated metrics.

## 🚀 Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpattens-tech%2F1-click&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required%20for%20database%20connection&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started&project-name=1-click-feedback&repository-name=1-click-feedback)

**Or use the automated setup script:**

```bash
git clone https://github.com/pattens-tech/1-click.git
cd 1-click
./scripts/setup.sh
```

## Features

- **Feedback Collection Page** (`/feedback`): 3-stage user flow for collecting 1-5 star ratings with optional comments
- **Admin Dashboard**: 
  - Line of Business (LoB) metrics (`/admin/lob`)
  - Moments that Matter (MtM) metrics (`/admin/mtm`)
- **Real-time Updates**: Dashboard auto-refreshes every 30 seconds
- **Beautiful UI**: Animated backgrounds, gradient effects, and responsive design

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy `.env.local.example` to `.env.local`
3. Fill in your Supabase credentials in `.env.local`
4. Run the SQL schema in the Supabase SQL editor:
   - Copy the contents of `supabase/migrations/20240101000000_initial_schema.sql`
   - Or run this simple SQL:

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

For detailed Supabase setup instructions, see [supabase/README.md](supabase/README.md).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Feedback URL Structure

```
/feedback/?r=[1-5]&utm_source=CRM&utm_medium=email&utm_campaign=[campaign]&utm_id=[id]&utm_term=[term]
```

Example:
```
/feedback/?r=5&utm_source=CRM&utm_medium=email&utm_campaign=newsletter&utm_id=NO-Shutdown&utm_term=Norican
```

### Admin Dashboard

- LoB Metrics: `/admin/lob`
- MtM Metrics: `/admin/mtm`

## Deployment

### Quick Deploy to Vercel

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpattens-tech%2F1-click&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20credentials%20required%20for%20database%20connection&envLink=https%3A%2F%2Fsupabase.com%2Fdocs%2Fguides%2Fgetting-started&project-name=1-click-feedback&repository-name=1-click-feedback)

### Manual Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy

### Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Tech Stack

- **Frontend**: Next.js, React
- **Backend**: Next.js API Routes (Serverless)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel