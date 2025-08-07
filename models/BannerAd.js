const mongoose = require('mongoose');
const BannerAdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('BannerAd', BannerAdSchema);
