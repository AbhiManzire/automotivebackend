// const mongoose = require("mongoose");

// const luckyDrawCouponSchema = new mongoose.Schema({
//   couponCode: {
//     type: String,
//     required: true,
//   },
//   value: {
//     type: Number,
//     required: true,
//   },
//   vehicleId: {
//     type: String,
//     required: true,
//   },
//   vehicleType: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: String,
//     default: null,
//   },
//   region: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   isRedeemed: {
//     type: Boolean,
//     default: false,
//   },
//   redeemAsDiscount: {
//     type: Boolean,
//     default: true,
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("LuckyDrawCoupon", luckyDrawCouponSchema);


const mongoose = require("mongoose");

const luckyDrawCouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true, // No duplicate coupon codes
    trim: true
  },

  value: {
    type: Number, // Coupon value in ₹
    required: true,
  },

  vehicleId: {
    type: mongoose.Schema.Types.ObjectId, // Refers to vehicle listing
    ref: "Vehicle",
    required: true,
  },

  vehicleType: {
    type: String,
    enum: ["Cars", "Bikes"], // Restrict to Cars or Bikes
    required: true,
  },

  luckyDrawConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LuckyDrawConfig", // Link to config that generated this coupon
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // Filled after coupon is assigned/won
  },

  region: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  isRedeemed: {
    type: Boolean,
    default: false,
  },

  redeemedAt: {
    type: Date, // Track when coupon was redeemed
    default: null,
  },

  redeemAsDiscount: {
    type: Boolean,
    default: true, // If true, acts as a discount code for purchases
  },

  tierLabel: {
    type: String,
    default: null, // E.g., "Gold", "Silver", "Bronze" if you introduce tiers
  }

}, { timestamps: true });

module.exports = mongoose.model("LuckyDrawCoupon", luckyDrawCouponSchema);
