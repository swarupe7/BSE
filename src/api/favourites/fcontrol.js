const Stock =require('../../models/stock');
const express = require('express');
const router = express.Router();
// POST route to add a stock to favorites
router.post('/add/:id', async (req, res) => {
    const { id } = req.params;
  
    try {  
      const stock = await Stock.findOne({ code:id });
  
      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      }
    
      // Check if the stock is already marked as a favorite
      if (stock.isFavorite) {
        return res.status(400).json({ error: 'Stock is already a favorite' });
      }
  
      // Mark the stock as a favorite
      stock.isFavorite = true;
      await stock.save();
  
      res.status(201).json({ message: 'Stock added to favorites successfully' });
    } catch (error) {
      console.error('Error adding stock to favorites:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/visit', async (req, res) => {
    try {
      const favoriteStocks = await Stock.find({isFavorite: true});
      res.status(200).json(favoriteStocks);
    } catch (error) {
      console.error('Error getting favorite stocks:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.delete('/delete/:symbol', async (req, res) => {
    const { symbol } = req.params;
  
    try {
      const deletedFavoriteStock = await Stock.findOne({ code:symbol });
  
      if (!deletedFavoriteStock) {
        return res.status(404).json({ error: 'Favorite stock not found' });
      }

      deletedFavoriteStock.isFavorite = false;

      deletedFavoriteStock.save();
  
      res.status(200).json({message: 'Favorite removed successfully'});
    } catch (error) {
      console.error('Error deleting favorite stock:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  module.exports = router;