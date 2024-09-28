// backend/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory'); //path to model

// Route to handle adding inventory
router.post('/add', async (req, res) => {

  console.log('Request Body:', req.body); // Log the incoming request body

  try {
    const {Id, location, capacity, itemTypes } = req.body;
    const newInventory = new Inventory({Id, location, capacity, itemTypes });
    await newInventory.save();

    console.log('Inventory item created:', newInventory);

    res.status(201).json({ message: 'Inventory added successfully' });
  } catch (error) {
    console.error('Error adding inventory:', error); // Log any errors
    res.status(500).json({ message: 'Failed to add inventory', error });
  }
});

// Route to get all inventories
router.get('/', async (req, res) => {
    try {
        const inventories = await Inventory.find(); // Fetch all inventories
        res.json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an inventory item by ID
router.put('/inventory/:id', async (req, res) => {
    try {
      const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) {
        return res.status(404).send('Item not found');
      }
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update inventory item' });
    }
});

// Delete an inventory item by ID
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      // Assuming Inventory is the Mongoose model for your inventory data
      const deletedItem = await Inventory.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete item', error });
    }
  });

module.exports = router;
