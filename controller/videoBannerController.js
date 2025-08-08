const VideoBanner = require('../models/VideoBanner');

// Create
exports.createVideoBanner = async (req, res) => {
  try {
    const banner = await VideoBanner.create(req.body);
    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getAllVideoBanners = async (req, res) => {
  try {
    const banners = await VideoBanner.find().sort({ createdAt: -1 });
    res.json(banners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getVideoBannerById = async (req, res) => {
  try {
    const banner = await VideoBanner.findById(req.params.id);
    if (!banner) return res.status(404).json({ error: "Video banner not found" });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateVideoBanner = async (req, res) => {
  try {
    const banner = await VideoBanner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) return res.status(404).json({ error: "Video banner not found" });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteVideoBanner = async (req, res) => {
  try {
    const banner = await VideoBanner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ error: "Video banner not found" });
    res.json({ message: "Video banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
