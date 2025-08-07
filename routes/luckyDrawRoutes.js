const router = require('express').Router();
const ctrl = require('../controller/luckyDrawController');

router.post('/config', ctrl.createOrUpdateConfig);
router.get('/config', ctrl.getAllConfigs);
router.post('/manual-generate', ctrl.manualGenerate);
router.post('/auto-generate', ctrl.autoGenerate);
router.get('/coupons/:userId', ctrl.getUserCoupons);
router.post('/redeem/:id', ctrl.redeemCoupon);

module.exports = router;