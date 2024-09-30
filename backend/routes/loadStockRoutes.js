const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock'); // Import the Stock model
const InventoryStatus = require('../models/InventoryStatus'); // Import the inventoy status model

// POST route for adding new stock and set inventory status
router.post('/add', async (req, res) => {
  
  console.log('Request Body:', req.body); // Log the incoming request body
  const { itemType, sku, itemName, amount, worth, occupiedSpace, date } = req.body;

  try {
    // Save the new stock in the load_stocks table
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

    // Check if the item already exists in the inventory_status table
    const existingStatus = await InventoryStatus.findOne({ itemName, itemType });

    if (existingStatus) {
      // If it exists, update the amount and worth
      existingStatus.amount += amount;
      existingStatus.worth += worth;
      existingStatus.occupiedSpace += occupiedSpace;
      existingStatus.date = date;

      await existingStatus.save();
      console.log('Inventory status updated:', existingStatus);
    } else {
      // If it doesn't exist, create a new record in the inventory_status table
      const newInventoryStatus = new InventoryStatus({
        itemType,
        sku,
        itemName,
        amount,
        worth,
        occupiedSpace,
        date,
      });
      
      await newInventoryStatus.save();
      console.log('New inventory status created:', newInventoryStatus);
    }

    res.status(201).json({ message: 'Stock added successfully and inventory status updated!' });

  } catch (error) {
    console.error('Error adding stock or updating inventory status:', error.message);
    res.status(500).json({ error: 'Failed to add stock and update inventory status' });
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

// GET route to fetch data from inventory_status table-------------------------------------------
router.get('/inventory_status', async (req, res) => {
  try {
      const inventoryStatusData = await InventoryStatus.find(); // Fetch all records from inventory_status table
      res.json(inventoryStatusData);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch inventory status data' });
  }
});

module.exports = router;
