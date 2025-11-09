import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { rating, utm_campaign, utm_term, utm_content, comments } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Insert feedback into database
    const { data, error } = await supabase
      .from('feedback')
      .insert([
        {
          rating: parseInt(rating),
          utm_campaign: utm_campaign || null,
          utm_term: utm_term || null,
          utm_content: utm_content || null,
          comments: comments || null,
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }

    return res.status(201).json({ 
      success: true, 
      id: data[0].id,
      message: 'Feedback recorded successfully' 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
