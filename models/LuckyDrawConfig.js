const mongoose = require("mongoose");

const luckyDrawConfigSchema = new mongoose.Schema({
  vehicleType: {
    type: String,
    enum: ["Cars", "Bikes"],
    required: true,
  },
  baseValue: {
    type: Number,
    required: true,
  },
  couponValue: {
    type: Number,
    required: true,
  },
  mode: {
    type: String,
    enum: ["manual", "auto"],
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
}, { timestamps: true });

module.exports = mongoose.model("LuckyDrawConfig", luckyDrawConfigSchema);
