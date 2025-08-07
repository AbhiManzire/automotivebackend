const router = require("express").Router();
const vendorController = require("../controllers/vendorController");

router.post("/vendors", vendorController.createVendor);
router.get("/vendors", vendorController.getAllVendors);
router.get("/vendors/:id", vendorController.getVendorById);
router.put("/vendors/:id", vendorController.updateVendor);
router.delete("/vendors/:id", vendorController.deleteVendor);

router.post("/vendors/shop", vendorController.createOrUpdateShop);
router.post("/vendors/payment", vendorController.createOrUpdatePayment);

module.exports = router;
