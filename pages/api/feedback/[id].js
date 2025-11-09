import { supabase } from '../../../lib/supabase';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    const { rating, comments } = req.body;

    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Build update object
    const updates = {};
    if (rating) updates.rating = parseInt(rating);
    if (comments !== undefined) updates.comments = comments;

    // Update feedback in database
    const { data, error } = await supabase
      .from('feedback')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to update feedback' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Feedback updated successfully' 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
