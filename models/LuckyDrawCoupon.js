const mongoose = require("mongoose");

const luckyDrawCouponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  vehicleId: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    default: null,
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
  redeemAsDiscount: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("LuckyDrawCoupon", luckyDrawCouponSchema);
