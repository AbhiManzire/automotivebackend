const router = require('express').Router();
const ctrl = require('../controller/usedSparePartsController');
router.post('/', ctrl.createUsedPart);
router.get('/', ctrl.getAllUsedParts);
router.get('/:id', ctrl.getUsedPartById);
router.put('/:id', ctrl.updateUsedPart);
router.delete('/:id', ctrl.deleteUsedPart);
module.exports = router;
