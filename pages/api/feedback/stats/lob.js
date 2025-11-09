import { supabase } from '../../../../lib/supabase';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Define the LoB terms
    const lobTerms = ['Norican', 'Monitizer', 'DISA', 'StrikoWestofen', 'Wheelabrator'];
    
    // Fetch all feedback grouped by utm_term
    const { data, error } = await supabase
      .from('feedback')
      .select('utm_term, rating, timestamp')
      .in('utm_term', lobTerms);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }

    // Calculate statistics for each term
    const stats = {};
    lobTerms.forEach(term => {
      stats[term] = {
        term,
        average: 0,
        count: 0,
        lastUpdated: null
      };
    });

    data.forEach(item => {
      if (item.utm_term && stats[item.utm_term]) {
        stats[item.utm_term].count++;
        stats[item.utm_term].average += item.rating;
        
        // Track latest timestamp
        if (!stats[item.utm_term].lastUpdated || 
            new Date(item.timestamp) > new Date(stats[item.utm_term].lastUpdated)) {
          stats[item.utm_term].lastUpdated = item.timestamp;
        }
      }
    });

    // Calculate averages
    Object.keys(stats).forEach(term => {
      if (stats[term].count > 0) {
        stats[term].average = (stats[term].average / stats[term].count).toFixed(1);
      } else {
        stats[term].average = 0;
      }
    });

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
