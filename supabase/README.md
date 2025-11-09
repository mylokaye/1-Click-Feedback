# Supabase Setup Guide

This directory contains the database schema and configuration for the 1-Click Feedback System.

## Quick Setup

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned (~2 minutes)
3. Go to the SQL Editor in your Supabase dashboard
4. Copy and paste the contents of `migrations/20240101000000_initial_schema.sql`
5. Click "Run" or press Cmd/Ctrl + Enter
6. Get your API credentials from Settings > API:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key (starts with `eyJ...`)

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase (if not already initialized)
supabase init

# Link to your remote project
supabase link --project-ref your-project-ref

# Apply migrations
supabase db push

# Or apply migrations manually
supabase db execute migrations/20240101000000_initial_schema.sql
```

## Database Schema

The feedback table stores all user feedback submissions:

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL PRIMARY KEY | Auto-incrementing unique identifier |
| `rating` | INTEGER | Star rating (1-5) |
| `timestamp` | TIMESTAMP | When the feedback was submitted |
| `utm_campaign` | TEXT | Campaign identifier (for MtM tracking) |
| `utm_term` | TEXT | Term/LoB identifier (for LoB tracking) |
| `utm_content` | TEXT | Additional content tracking |
| `comments` | TEXT | Optional user comments |

### Indexes

The following indexes are created for optimal query performance:

- `idx_feedback_timestamp`: For time-based queries
- `idx_feedback_utm_term`: For Line of Business (LoB) queries
- `idx_feedback_utm_campaign`: For Moments that Matter (MtM) queries
- `idx_feedback_rating`: For rating analytics

## Environment Variables

After setting up Supabase, add these to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Testing the Connection

```bash
# Start your development server
npm run dev

# Test the API endpoints
curl http://localhost:3000/api/feedback/stats/lob
curl http://localhost:3000/api/feedback/stats/mtm
```

## Security Considerations

### Row Level Security (RLS)

For production, consider enabling Row Level Security on the feedback table:

```sql
-- Enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for feedback submission)
CREATE POLICY "Allow public insert" ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated reads (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON feedback
  FOR SELECT
  TO authenticated
  USING (true);
```

**Note:** The current setup uses the anon key which allows public access. For production, implement proper authentication for the admin dashboard.

## Troubleshooting

### Connection Issues

- Verify your Supabase project is active (not paused)
- Check that the Project URL and Anon Key are correct
- Ensure the feedback table exists in your database

### Migration Issues

- Make sure you're using Supabase CLI v1.0.0 or higher
- Check that your database password is correct
- Verify you have permissions to create tables

### Query Performance

- Indexes should be automatically created by the migration
- For large datasets, consider adding additional indexes
- Monitor query performance in the Supabase dashboard

## Support

For issues:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the main project README.md
3. Check the DEPLOYMENT.md guide
