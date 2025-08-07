const mongoose = require("mongoose");

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "pending", "blocked"], default: "pending" },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
}, { timestamps: true });

// Shop Schema
const shopSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  shopName: { type: String, required: true },
  address: { type: String },
  logo: { type: String },
  description: { type: String },
}, { timestamps: true });

// Vendor Payment Schema
const paymentSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  accountHolderName: { type: String },
  bankName: { type: String },
  accountNumber: { type: String },
  ifscCode: { type: String },
  upiId: { type: String },
}, { timestamps: true });

// Exporting all models
const Vendor = mongoose.model("Vendor", vendorSchema);
const Shop = mongoose.model("Shop", shopSchema);
const VendorPayment = mongoose.model("VendorPayment", paymentSchema);

module.exports = {
  Vendor,
  Shop,
  VendorPayment,
};



