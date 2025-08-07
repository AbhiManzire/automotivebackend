const express = require('express');
const router = express.Router();
const bannerAdController = require('../controller/bannerAdController');
// Create
router.post('/', bannerAdController.createBannerAd);
// Read all
router.get('/', bannerAdController.getAllBannerAds);
// Update
router.put('/:id', bannerAdController.updateBannerAd);
// Delete
router.delete('/:id', bannerAdController.deleteBannerAd);
router.get('/:id', bannerAdController.getBannerAdById);
module.exports = router;
