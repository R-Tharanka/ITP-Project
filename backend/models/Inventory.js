
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  itemTypes: {
    rawMaterial: { type: Boolean, default: false },
    semiFinalProducts: { type: Boolean, default: false },
    finalProducts: { type: Boolean, default: false },
    returnedGoods: { type: Boolean, default: false },
    wastage: { type: Boolean, default: false },
  }
});

module.exports = mongoose.model('Inventory', inventorySchema);
