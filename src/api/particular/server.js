
const express = require('express');
const Stock = require('../../models/stock');
const NodeCache = require('node-cache');


const router2 = express.Router();
const cache = new NodeCache({ stdTTL: 60 *60* 5 });


router2.get('/:code', async (req, res) => {
  const { code } = req.params; 

  try {
    // Fetch historical stock data from the database 
    const cachedData = cache.get(code);
    if (cachedData) {
      console.log(`Returning cached data for stock with code: ${code}`);
      return res.status(200).json(cachedData);
    }


    const stockHistory = await Stock.find({ name:{ $regex: new RegExp(code, 'i') } }).select('open high low close date').sort({ date: -1 });

    if (stockHistory.length === 0) {
      return res.status(404).json({ error: 'Stock not found or no historical data available' });
    }

    cache.set(code, stockHistory);
    

    res.status(200).json(stockHistory);
  } catch (error) {
    console.error('Error fetching stock price history:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router2;




