const express = require('express');
const router = express.Router();
const videoBannerController = require('../controller/videoBannerController');

// Create
router.post('/', videoBannerController.createVideoBanner);

// Read all
router.get('/', videoBannerController.getAllVideoBanners);

// Get by ID
router.get('/:id', videoBannerController.getVideoBannerById);

// Update
router.put('/:id', videoBannerController.updateVideoBanner);

// Delete
router.delete('/:id', videoBannerController.deleteVideoBanner);

module.exports = router;
