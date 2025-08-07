const BannerAd = require('../models/BannerAd');

// Create
exports.createBannerAd = async (req, res) => {
  try {
    const ad = await BannerAd.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read all
exports.getAllBannerAds = async (req, res) => {
  try {
    const ads = await BannerAd.find().sort({ createdAt: -1 });
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
exports.getBannerAdById = async (req, res) => {
  try {
    const ad = await BannerAd.findById(req.params.id);
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateBannerAd = async (req, res) => {
  try {
    const ad = await BannerAd.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
exports.deleteBannerAd = async (req, res) => {
  try {
    const ad = await BannerAd.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json({ message: "Banner deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
