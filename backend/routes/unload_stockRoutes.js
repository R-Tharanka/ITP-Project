const express = require('express');
const router = express.Router();
const UnloadStock = require('../models/UnloadStock');
const InventoryStatus = require('../models/InventoryStatus');

// Route for create unloading stock  and set inventory status
router.post('/unload', async (req, res) => {
    try {
        const { itemName, itemType, sku, amount, worth, occupiedSpace, date } = req.body;

        // First, check if the item exists in the inventory_status table
        const inventoryItem = await InventoryStatus.findOne({ itemName, itemType });

        if (!inventoryItem) {
            return res.status(400).json({ message: 'Item not found in inventory.' });
        }

        // Check if enough stock is available to unload
        if (inventoryItem.amount < amount) {
            return res.status(400).json({ message: 'Insufficient stock to unload.' });
        }

        // Calculate the new amount and worth after unloading
        const newAmount = inventoryItem.amount - amount;
        const newWorth = inventoryItem.worth - worth;
        const newOccupiedSpace = inventoryItem.occupiedSpace - occupiedSpace;
        const newDate = date;

        // Update the inventory_status table with the new values
        await InventoryStatus.updateOne(
            { itemName, itemType },
            {
                $set: {
                    amount: newAmount,
                    worth: newWorth,
                    occupiedSpace: newOccupiedSpace,
                    date: newDate 
                }
            }
        );

        // Now insert the unload record into the unload_stocks table
        const newUnload = new UnloadStock({
            itemName,
            itemType,
            sku,
            amount,
            worth,
            occupiedSpace,
            date
        });

        await newUnload.save();

        res.status(200).json({ message: 'Unload successful and inventory updated.' });
    } catch (error) {
        console.error('Error unloading stock:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get all loadin stock data
router.get('/', async (req, res) => {
    try {
        const unloadstocks = await UnloadStock.find();  // Retrieve all stock data from MongoDB
        res.json(unloadstocks);  // Send the data back to the client
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  });

module.exports = router;
