const Stock = require('../models/stock');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 *60* 3 });



const getTop10Stocks = async (req, res) => {
  try {
    const cachedData = cache.get('top10Stocks');
    if (cachedData) {
      console.log('Returning cached data for top 10 stocks');
      return res.json(cachedData);
    }
    const topStocks = await Stock.find().sort({ close: -1 }).limit(10);
    cache.set('top10Stocks', topStocks);
    res.json(topStocks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findStockByName = async (req, res) => {
  try {
    const { name } = req.params;
    const stocks = await Stock.find({ name: { $regex: new RegExp(name, 'i') } });
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  getTop10Stocks,
  findStockByName,

};
