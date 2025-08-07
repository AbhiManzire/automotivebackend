const { Vendor, Shop, VendorPayment } = require("../models/vendorModels");

// Register Vendor (with optional shop)
exports.createVendor = async (req, res) => {
  try {
    const { name, email, mobile, password, shopName } = req.body;

    const vendor = await Vendor.create({ name, email, mobile, password });

    let shop = null;
    if (shopName) {
      shop = await Shop.create({ shopName, vendor: vendor._id });
      vendor.shop = shop._id;
      await vendor.save();
    }

    res.status(201).json({ vendor, shop });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Vendors with Shop
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("shop");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single vendor
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate("shop");
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vendor profile
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete vendor (and optionally shop and payment info)
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    // Delete linked shop and payments if any
    await Shop.deleteOne({ vendor: vendor._id });
    await VendorPayment.deleteMany({ vendor: vendor._id });

    await Vendor.findByIdAndDelete(req.params.id);

    res.json({ message: "Vendor and related data deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create / Update Shop
exports.createOrUpdateShop = async (req, res) => {
  try {
    const { vendorId, shopName, address, logo, description } = req.body;

    let shop = await Shop.findOne({ vendor: vendorId });

    if (shop) {
      shop.shopName = shopName;
      shop.address = address;
      shop.logo = logo;
      shop.description = description;
      await shop.save();
    } else {
      shop = await Shop.create({ vendor: vendorId, shopName, address, logo, description });
      await Vendor.findByIdAndUpdate(vendorId, { shop: shop._id });
    }

    res.json(shop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create / Update Vendor Payment
exports.createOrUpdatePayment = async (req, res) => {
  try {
    const { vendorId, accountHolderName, bankName, accountNumber, ifscCode, upiId } = req.body;

    let payment = await VendorPayment.findOne({ vendor: vendorId });

    if (payment) {
      payment.accountHolderName = accountHolderName;
      payment.bankName = bankName;
      payment.accountNumber = accountNumber;
      payment.ifscCode = ifscCode;
      payment.upiId = upiId;
      await payment.save();
    } else {
      payment = await VendorPayment.create({ vendor: vendorId, accountHolderName, bankName, accountNumber, ifscCode, upiId });
    }

    res.json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
