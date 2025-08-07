// const { Vendor, Shop, VendorPayment } = require("../models/vendorModels");
// // Register Vendor (with optional shop)
// exports.createVendor = async (req, res) => {
//   try {
//     const { name, email, mobile, password, shopName } = req.body;
//     const vendor = await Vendor.create({ name, email, mobile, password });
//     let shop = null;
//     if (shopName) {
//       shop = await Shop.create({ shopName, vendor: vendor._id });
//       vendor.shop = shop._id;
//       await vendor.save();
//     }
//     res.status(201).json({ vendor, shop });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// // Get All Vendors with Shop
// exports.getAllVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find().populate("shop");
//     res.json(vendors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Get single vendor
// exports.getVendorById = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id).populate("shop");
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     res.json(vendor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Update vendor profile
// exports.updateVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(vendor);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// // Delete vendor (and optionally shop and payment info)
// exports.deleteVendor = async (req, res) => {
//   try {
//     const vendor = await Vendor.findById(req.params.id);
//     if (!vendor) return res.status(404).json({ message: "Vendor not found" });
//     // Delete linked shop and payments if any
//     await Shop.deleteOne({ vendor: vendor._id });
//     await VendorPayment.deleteMany({ vendor: vendor._id });
//     await Vendor.findByIdAndDelete(req.params.id);
//     res.json({ message: "Vendor and related data deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// // Create / Update Shop
// exports.createOrUpdateShop = async (req, res) => {
//   try {
//     const { vendorId, shopName, address, logo, description } = req.body;
//     let shop = await Shop.findOne({ vendor: vendorId });
//     if (shop) {
//       shop.shopName = shopName;
//       shop.address = address;
//       shop.logo = logo;
//       shop.description = description;
//       await shop.save();
//     } else {
//       shop = await Shop.create({ vendor: vendorId, shopName, address, logo, description });
//       await Vendor.findByIdAndUpdate(vendorId, { shop: shop._id });
//     }
//     res.json(shop);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// // Create / Update Vendor Payment
// exports.createOrUpdatePayment = async (req, res) => {
//   try {
//     const { vendorId, accountHolderName, bankName, accountNumber, ifscCode, upiId } = req.body;
//     let payment = await VendorPayment.findOne({ vendor: vendorId });
//     if (payment) {
//       payment.accountHolderName = accountHolderName;
//       payment.bankName = bankName;
//       payment.accountNumber = accountNumber;
//       payment.ifscCode = ifscCode;
//       payment.upiId = upiId;
//       await payment.save();
//     } else {
//       payment = await VendorPayment.create({ vendor: vendorId, accountHolderName, bankName, accountNumber, ifscCode, upiId });
//     }
//     res.json(payment);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
const { Vendor, Shop, VendorPayment, Location } = require("../models/Vendor");

// Create Vendor (with optional shop)
exports.createVendor = async (req, res) => {
  try {
    const { name, email, mobile, password, shopName } = req.body;

    const vendor = await Vendor.create({ name, email, mobile, password });

    let shop = null;
    if (shopName) {
      shop = await Shop.create({
        vendor: vendor._id,
        shopName,
      });
      vendor.shop = shop._id;
      await vendor.save();
    }

    res.status(201).json({ vendor, shop });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vendors with shop details
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("shop");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single vendor with shop
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("shop");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vendor + related data
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    await Shop.deleteOne({ vendor: vendor._id });
    await VendorPayment.deleteMany({ vendor: vendor._id });
    await Location.deleteMany({ vendor: vendor._id });
    await Vendor.findByIdAndDelete(vendor._id);

    res.json({ message: "Vendor and related data deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or Update Shop with full options
// exports.createOrUpdateShop = async (req, res) => {
//   try {
//     const {
//       vendorId,
//       shopName,
//       address,
//       logo,
//       banner,
//       description,
//       socialLinks,
//       policies
//     } = req.body;

//     let shop = await Shop.findOne({ vendor: vendorId });

//     if (shop) {
//       shop.shopName = shopName;
//       shop.address = address;
//       shop.logo = logo;
//       shop.banner = banner;
//       shop.description = description;
//       shop.socialLinks = socialLinks;
//       shop.policies = policies;
//       await shop.save();
//     } else {
//       shop = await Shop.create({
//         vendor: vendorId,
//         shopName,
//         address,
//         logo,
//         banner,
//         description,
//         socialLinks,
//         policies,
//       });
//       await Vendor.findByIdAndUpdate(vendorId, { shop: shop._id });
//     }

//     res.json(shop);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
exports.createOrUpdateShop = async (req, res) => {
  try {
    // Destructure using the correct field name that matches your request body
    const {
      vendor, // Changed from vendorId to match request body
      shopName,
      address,
      logo,
      banner,
      description,
      socialLinks,
      policies
    } = req.body;

    // 1. Validate vendor ID format
    if (!mongoose.Types.ObjectId.isValid(vendor)) {
      return res.status(400).json({ message: "Invalid vendor ID format" });
    }

    // 2. Verify vendor exists and is active
    const vendorDoc = await Vendor.findById(vendor);
    if (!vendorDoc) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    
    // Optional: Check if vendor is active
    if (vendorDoc.status !== 'active') {
      return res.status(400).json({ message: "Vendor account is not active" });
    }

    // 3. Create or update shop
    let shop = await Shop.findOne({ vendor });

    if (shop) {
      // Update existing shop
      shop.shopName = shopName;
      shop.address = address;
      shop.logo = logo;
      shop.banner = banner;
      shop.description = description;
      shop.socialLinks = socialLinks;
      shop.policies = policies;
      await shop.save();
    } else {
      // Create new shop
      shop = await Shop.create({
        vendor, // Using the correct field name
        shopName,
        address,
        logo,
        banner,
        description,
        socialLinks,
        policies,
      });
      
      // Update vendor's shop reference
      await Vendor.findByIdAndUpdate(vendor, { shop: shop._id });
    }

    res.json(shop);
  } catch (error) {
    console.error("Shop operation error:", error);
    res.status(400).json({ 
      message: error.message,
      receivedVendorId: req.body.vendor,
      isValidObjectId: mongoose.Types.ObjectId.isValid(req.body.vendor)
    });
  }
};
// Create or Update Vendor Payment
exports.createOrUpdatePayment = async (req, res) => {
  try {
    const {
      vendorId,
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      upiId
    } = req.body;

    let payment = await VendorPayment.findOne({ vendor: vendorId });

    if (payment) {
      payment.accountHolderName = accountHolderName;
      payment.bankName = bankName;
      payment.accountNumber = accountNumber;
      payment.ifscCode = ifscCode;
      payment.upiId = upiId;
      await payment.save();
    } else {
      payment = await VendorPayment.create({
        vendor: vendorId,
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode,
        upiId
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔄 Create or Update Location (Offline Store / Warehouse)
exports.createOrUpdateLocation = async (req, res) => {
  try {
    const {
      vendorId,
      shopId,
      name,
      address,
      latitude,
      longitude,
      phoneNumber,
      whatsappNumber,
      isWarehouse,
      showOnMap
    } = req.body;

    const existing = await Location.findOne({ vendor: vendorId, name });

    let location;
    if (existing) {
      Object.assign(existing, {
        address,
        latitude,
        longitude,
        phoneNumber,
        whatsappNumber,
        isWarehouse,
        showOnMap
      });
      await existing.save();
      location = existing;
    } else {
      location = await Location.create({
        vendor: vendorId,
        shop: shopId,
        name,
        address,
        latitude,
        longitude,
        phoneNumber,
        whatsappNumber,
        isWarehouse,
        showOnMap
      });
    }

    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🗺️ Get All Locations with Search
exports.getAllLocations = async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const locations = await Location.find(query).populate("vendor").populate("shop");
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Shop by Vendor ID
exports.getShopByVendorId = async (req, res) => {
  const shop = await Shop.findOne({ vendor: req.params.id });
  if (!shop) return res.status(404).json({ message: "Shop not found" });
  res.json(shop);
};

// Delete Shop by Vendor ID
exports.deleteShopByVendorId = async (req, res) => {
  await Shop.deleteOne({ vendor: req.params.id });
  res.json({ message: "Shop deleted" });
};

// Get Vendor Payment
exports.getVendorPayment = async (req, res) => {
  const payment = await VendorPayment.findOne({ vendor: req.params.id });
  if (!payment) return res.status(404).json({ message: "Payment info not found" });
  res.json(payment);
};

// Delete Vendor Payment
exports.deleteVendorPayment = async (req, res) => {
  await VendorPayment.deleteOne({ vendor: req.params.id });
  res.json({ message: "Payment info deleted" });
};

// Get Single Location
exports.getLocationById = async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (!location) return res.status(404).json({ message: "Location not found" });
  res.json(location);
};

// Delete Single Location
exports.deleteLocationById = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};
