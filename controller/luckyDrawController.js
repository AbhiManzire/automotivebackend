const Coupon = require('../models/Coupon');
const LuckyDrawConfig = require('../models/LuckyDrawConfig');
const generateCouponCode = (vehicleType, state) => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `LD-${vehicleType.slice(0, 3).toUpperCase()}-${state.slice(0, 2).toUpperCase()}-${random}`;
};
const getConfig = async (vehicleType, state) => {
  const config = await LuckyDrawConfig.findOne({ vehicleType, state, isEligible: true });
  if (!config) throw new Error('Vehicle type is not eligible for lucky draw in this state');
  return config;
};
exports.createOrUpdateConfig = async (req, res) => {
  try {
    const config = await LuckyDrawConfig.findOneAndUpdate(
      { vehicleType: req.body.vehicleType, state: req.body.state },
      req.body,
      { upsert: true, new: true }
    );
    res.status(200).json(config);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getAllConfigs = async (req, res) => {
  try {
    const configs = await LuckyDrawConfig.find();
    res.status(200).json(configs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.manualGenerate = async (req, res) => {
  try {
    const { vehicleId, vehicleType, vehicleValue, state, region } = req.body;
    const config = await getConfig(vehicleType, state);
    const count = Math.floor(vehicleValue / config.couponValue);
    const coupons = [];
    for (let i = 0; i < count; i++) {
      const coupon = new Coupon({
        title: { en: 'Lucky Draw Coupon' },
        couponCode: generateCouponCode(vehicleType, state),
        startTime: new Date(),
        endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        discountType: { type: 'flat', value: config.couponValue },
        minimumAmount: 0,
        productType: vehicleType,
        status: 'show',
      });
      coupons.push(await coupon.save());
    }
    res.status(200).json({ message: `${count} coupons generated`, coupons });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.autoGenerate = async (req, res) => {
  // same logic as manualGenerate but can be optimized later
  return exports.manualGenerate(req, res);
};
exports.getUserCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({ userId: req.params.userId });
    res.status(200).json(coupons);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.redeemCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(req.params.id, { status: 'hide' }, { new: true });
    res.status(200).json({ message: 'Coupon redeemed', coupon });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
