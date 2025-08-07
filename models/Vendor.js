// const mongoose = require("mongoose");

// // Vendor Schema
// const vendorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   mobile: { type: String, required: true },
//   password: { type: String, required: true },
//   status: { type: String, enum: ["active", "pending", "blocked"], default: "pending" },
//   shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
// }, { timestamps: true });

// // Shop Schema
// const shopSchema = new mongoose.Schema({
//   vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//   shopName: { type: String, required: true },
//   address: { type: String },
//   logo: { type: String },
//   description: { type: String },
// }, { timestamps: true });

// // Vendor Payment Schema
// const paymentSchema = new mongoose.Schema({
//   vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
//   accountHolderName: { type: String },
//   bankName: { type: String },
//   accountNumber: { type: String },
//   ifscCode: { type: String },
//   upiId: { type: String },
// }, { timestamps: true });

// // Exporting all models
// const Vendor = mongoose.model("Vendor", vendorSchema);
// const Shop = mongoose.model("Shop", shopSchema);
// const VendorPayment = mongoose.model("VendorPayment", paymentSchema);

// module.exports = {
//   Vendor,
//   Shop,
//   VendorPayment,
// };



const mongoose = require("mongoose");

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String, enum: ["active", "pending", "blocked"], default: "pending" },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
  profileImage: { type: String }, // Optional profile picture
  isOnline: { type: Boolean, default: false }, // For chat availability
}, { timestamps: true });


// Shop Schema
const shopSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  shopName: { type: String, required: true },
  logo: { type: String },
  banner: { type: String }, // For storefront banner
  address: { type: String },
  description: { type: String },
  socialLinks: {
    facebook: String,
    instagram: String,
    website: String,
  },
  policies: {
    terms: { type: String },
    returnPolicy: { type: String },
    shippingPolicy: { type: String },
  },
  rating: { type: Number, default: 0 }, // Aggregate customer rating
  totalProducts: { type: Number, default: 0 }, // Can be auto-managed
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


// Offline Store / Warehouse Location Schema
const locationSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true },
  name: { type: String, required: true }, // Name of store/warehouse
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  isWarehouse: { type: Boolean, default: false },
  phoneNumber: { type: String },
  whatsappNumber: { type: String },
  showOnMap: { type: Boolean, default: true }, // Toggle map display
}, { timestamps: true });

const Vendor = mongoose.model("Vendor", vendorSchema);
const Shop = mongoose.model("Shop", shopSchema);
const VendorPayment = mongoose.model("VendorPayment", paymentSchema);
const Location = mongoose.model("Location", locationSchema);

module.exports = {
  Vendor,
  Shop,
  VendorPayment,
  Location,
};
