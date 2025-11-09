-- Create feedback table for 1-Click Feedback System
-- This table stores all feedback submissions from email campaigns

CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  comments TEXT
);

-- Create index on timestamp for faster queries
CREATE INDEX IF NOT EXISTS idx_feedback_timestamp ON feedback(timestamp DESC);

-- Create index on utm_term for LoB queries
CREATE INDEX IF NOT EXISTS idx_feedback_utm_term ON feedback(utm_term);

-- Create index on utm_campaign for MtM queries
CREATE INDEX IF NOT EXISTS idx_feedback_utm_campaign ON feedback(utm_campaign);

-- Create index on rating for analytics queries
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
