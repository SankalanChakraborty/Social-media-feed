const imageModel = require("../models/imageModel");

const uploadImage = async (req, res) => {
  const { caption } = req.body;
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const image = new imageModel({
    user: req.user.userId,
    imageUrl: req.file.path,
    caption,
    size: req.file.size,
  });
  await image.save();
  res.status(201).json({
    status: "OK",
    message: `Image uploaded ${image._id} successfully`,
  });
};

const getUserImages = async (req, res) => {
  const images = await imageModel
    .find({ user: req.user.userId })
    .sort({ createdAt: -1 });

  res.status(200).json({ status: "OK", images });
};

const deleteImage = async (req, res) => {
  const { imageId } = req.params;
  const image = await imageModel.findById(imageId);
  if (!image) {
    return res.status(404).json({ message: "Image not found" });
  }
  if (image.user.toString() !== req.user.userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  await imageModel.findByIdAndDelete(imageId);
  res.status(200).json({ status: "OK", message: "Image deleted successfully" });
};

module.exports = {
  uploadImage,
  getUserImages,
  deleteImage,
};
