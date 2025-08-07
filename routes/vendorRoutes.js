// const router = require("express").Router();
// const vendorController = require("../controllers/vendorController");

// router.post("/vendors", vendorController.createVendor);
// router.get("/vendors", vendorController.getAllVendors);
// router.get("/vendors/:id", vendorController.getVendorById);
// router.put("/vendors/:id", vendorController.updateVendor);
// router.delete("/vendors/:id", vendorController.deleteVendor);

// router.post("/vendors/shop", vendorController.createOrUpdateShop);
// router.post("/vendors/payment", vendorController.createOrUpdatePayment);

// module.exports = router;
const router = require("express").Router();
const vendorController = require("../controller/vendorController");

// =========================
// Vendor CRUD
// =========================
router.post("/vendors", vendorController.createVendor);             // Create Vendor
router.get("/vendors", vendorController.getAllVendors);             // Get All Vendors
router.get("/vendors/:id", vendorController.getVendorById);         // Get Single Vendor
router.put("/vendors/:id", vendorController.updateVendor);          // Update Vendor
router.delete("/vendors/:id", vendorController.deleteVendor);       // Delete Vendor + Related Data

// =========================
// Shop CRUD (linked to Vendor)
// =========================
router.post("/vendors/shop", vendorController.createOrUpdateShop);       // Create/Update Shop
router.get("/vendors/:id/shop", vendorController.getShopByVendorId);     // Get Shop by Vendor ID
router.delete("/vendors/:id/shop", vendorController.deleteShopByVendorId); // Delete Shop by Vendor ID

// =========================
// Vendor Payment CRUD
// =========================
router.post("/vendors/payment", vendorController.createOrUpdatePayment);     // Create/Update Payment
router.get("/vendors/:id/payment", vendorController.getVendorPayment);       // Get Payment Info
router.delete("/vendors/:id/payment", vendorController.deleteVendorPayment); // Delete Payment Info

// =========================
// Offline Store / Warehouse Location CRUD
// =========================
router.post("/vendors/location", vendorController.createOrUpdateLocation);    // Create/Update Location
router.get("/vendors/locations", vendorController.getAllLocations);           // Get All/Search Locations
router.get("/vendors/location/:id", vendorController.getLocationById);        // Get Single Location
router.delete("/vendors/location/:id", vendorController.deleteLocationById);  // Delete Single Location

module.exports = router;
