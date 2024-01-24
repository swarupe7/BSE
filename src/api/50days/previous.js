const express = require('express');
const Stock = require('../../models/stock');
const NodeCache = require('node-cache');

const router = express.Router();

const cache = new NodeCache({ stdTTL: 3600 }); 

// Route to fetch last 50 days' data
router.get('/', async (req, res) => {
  try {
    // Calculate the date 50 days ago
    const cachedData = cache.get('last50DaysData');

    if (cachedData) {
      return res.status(200).json(cachedData);
    }

    const fiftyDaysAgo = new Date();
    fiftyDaysAgo.setDate(fiftyDaysAgo.getDate() - 50);

    // Fetch historical data from the database for the last 50 days
    const last50DaysData = await Stock.find({ date: { $gte: fiftyDaysAgo } });

    if (last50DaysData.length === 0) {
      return res.status(404).json({ error: 'No data available for the last 50 days' });
    }

    cache.set('last50DaysData', last50DaysData);

    res.status(200).json(last50DaysData);
  } catch (error) {
    console.error('Error fetching last 50 days data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
