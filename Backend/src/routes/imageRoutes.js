const imageRouter = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const {
  uploadImage,
  getUserImages,
  deleteImage,
} = require("../controllers/imageController");

imageRouter.post(
  "/upload",
  authMiddleware,
  uploadMiddleware.single("image"),
  uploadImage,
);

imageRouter.get("/my-images", authMiddleware, getUserImages);

imageRouter.delete("/delete/:imageId", authMiddleware, deleteImage);

module.exports = imageRouter;
