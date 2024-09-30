const mongoose = require('mongoose');

const inventoryStatusSchema = new mongoose.Schema({
    itemType: { type: String, required: true },
    sku: { type: String, required: true },
    itemName: { type: String, required: true },
    amount: { type: Number, required: true },
    worth: { type: Number, required: true },
    occupiedSpace: { type: Number, required: true },
    date: { type: Date, required: true },
});

const Stock = mongoose.model('Inventory_Status', inventoryStatusSchema);

module.exports = Stock;
