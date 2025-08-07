const UsedSparePart = require('../models/UsedSpareParts');
exports.createUsedPart = async (req, res) => {
  try {
    const part = await UsedSparePart.create(req.body);
    res.status(201).json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getAllUsedParts = async (req, res) => {
  try {
    const parts = await UsedSparePart.find();
    res.status(200).json(parts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getUsedPartById = async (req, res) => {
  try {
    const part = await UsedSparePart.findById(req.params.id);
    res.status(200).json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateUsedPart = async (req, res) => {
  try {
    const part = await UsedSparePart.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(part);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteUsedPart = async (req, res) => {
  try {
    await UsedSparePart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Used spare part deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
