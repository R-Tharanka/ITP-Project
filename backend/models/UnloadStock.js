const mongoose = require('mongoose');

const unloadStockSchema = new mongoose.Schema({
    itemType: { type: String, required: true },
    sku: { type: String, required: true },
    itemName: { type: String, required: true },
    amount: { type: Number, required: true },
    worth: { type: Number, required: true },
    occupiedSpace: { type: Number, required: true },
    date: { type: Date, required: true },
});

const unloadStock = mongoose.model('unload_Stock', unloadStockSchema);

module.exports = unloadStock;
