// const mongoose = require("mongoose");

// const luckyDrawConfigSchema = new mongoose.Schema({
//   vehicleType: {
//     type: String,
//     enum: ["Cars", "Bikes"],
//     required: true,
//   },
//   baseValue: {
//     type: Number,
//     required: true,
//   },
//   couponValue: {
//     type: Number,
//     required: true,
//   },
//   mode: {
//     type: String,
//     enum: ["manual", "auto"],
//     default: "manual",
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   region: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["active", "inactive"],
//     default: "active",
//   },
// }, { timestamps: true });

// module.exports = mongoose.model("LuckyDrawConfig", luckyDrawConfigSchema);


const mongoose = require("mongoose");

const luckyDrawConfigSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ["Cars", "Bikes"], // Restrict only Cars and Bikes
    required: true,
  },

  baseValue: {
    type: Number, // Base price of the vehicle for coupon calculation
    required: true,
  },

  couponDenominations: [
    {
      value: { type: Number, required: true }, // Value of coupon tier (₹)
      quantity: { type: Number, required: true }, // Number of coupons for this tier
    }
  ],

  mode: {
    type: String,
    enum: ["manual", "auto"], // Auto-generate or Admin triggers
    default: "manual",
  },

  state: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  couponUsage: {
    type: String,
    enum: ["discount", "prize"], // Discount code or Prize coupon
    default: "discount",
  },

  linkedCouponCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coupon", // Reference to coupon schema for discount usage
  },

  autoGenerationRules: {
    percentageOfBaseValue: { type: Number }, // e.g., 10% of base value = coupon budget
    maxCoupons: { type: Number },
  }

}, { timestamps: true });

module.exports = mongoose.model("LuckyDrawConfig", luckyDrawConfigSchema);
