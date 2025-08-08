const mongoose = require('mongoose');

const VideoBannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true }, // Main video file link
  thumbnailUrl: { type: String }, // Optional preview image
  link: { type: String }, // Redirect link on click
  duration: { type: Number }, // Duration in seconds
  autoplay: { type: Boolean, default: false },
  mute: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('VideoBanner', VideoBannerSchema);
