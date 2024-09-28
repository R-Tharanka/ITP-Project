const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock'); // Import the Stock model

// POST route for adding new stock
router.post('/add', async (req, res) => {
  
  console.log('Request Body:', req.body); // Log the incoming request body
  const { itemType, sku, itemName, amount, worth, occupiedSpace, date } = req.body;

  try {
    const newStock = new Stock({
      itemType,
      sku,
      itemName,
      amount,
      worth,
      occupiedSpace,
      date,
    });
    
    await newStock.save();
    console.log('Stock item created:', newStock);

    res.status(201).json({ message: 'Stock added successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add stock' });
  }
});

// Route to get all loadin stock data
router.get('/', async (req, res) => {
  try {
      const stocks = await Stock.find();  // Retrieve all stock data from MongoDB
      res.json(stocks);  // Send the data back to the client
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

module.exports = router;
