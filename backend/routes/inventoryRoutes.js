// backend/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Route to handle adding inventory
router.post('/add', async (req, res) => {

    console.log('Request Body:', req.body); // Log the incoming request body

  try {
    const { location, capacity, itemTypes } = req.body;
    const newInventory = new Inventory({ location, capacity, itemTypes });
    await newInventory.save();

    console.log('Inventory item created:', newInventory);

    res.status(201).json({ message: 'Inventory added successfully' });
  } catch (error) {
    console.error('Error adding inventory:', error); // Log any errors
    res.status(500).json({ message: 'Failed to add inventory', error });
  }
});

module.exports = router;
