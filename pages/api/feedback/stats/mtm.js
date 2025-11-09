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
    // Define the MtM campaigns
    const mtmCampaigns = ['Newsletter', 'Signup', 'Inquiry'];
    
    // Fetch all feedback grouped by utm_campaign
    const { data, error } = await supabase
      .from('feedback')
      .select('utm_campaign, rating, timestamp')
      .in('utm_campaign', mtmCampaigns);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ error: 'Failed to fetch statistics' });
    }

    // Calculate statistics for each campaign
    const stats = {};
    mtmCampaigns.forEach(campaign => {
      stats[campaign] = {
        campaign,
        average: 0,
        count: 0,
        lastUpdated: null
      };
    });

    data.forEach(item => {
      if (item.utm_campaign && stats[item.utm_campaign]) {
        stats[item.utm_campaign].count++;
        stats[item.utm_campaign].average += item.rating;
        
        // Track latest timestamp
        if (!stats[item.utm_campaign].lastUpdated || 
            new Date(item.timestamp) > new Date(stats[item.utm_campaign].lastUpdated)) {
          stats[item.utm_campaign].lastUpdated = item.timestamp;
        }
      }
    });

    // Calculate averages
    Object.keys(stats).forEach(campaign => {
      if (stats[campaign].count > 0) {
        stats[campaign].average = (stats[campaign].average / stats[campaign].count).toFixed(1);
      } else {
        stats[campaign].average = 0;
      }
    });

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
