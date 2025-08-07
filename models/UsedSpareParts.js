const mongoose = require('mongoose');
const usedSparePartSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // e.g., Engine, Brake
  vehicleType: { type: String, required: true }, // e.g., Car, Bike
  grade: { type: String, enum: ['A+', 'A', 'B', 'C'], required: true },
  condition: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor'], required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  stock: { type: Number, default: 1 },
  status: { type: String, enum: ['show', 'hide'], default: 'show' }
}, { timestamps: true });
module.exports = mongoose.model('UsedSparePart', usedSparePartSchema);
