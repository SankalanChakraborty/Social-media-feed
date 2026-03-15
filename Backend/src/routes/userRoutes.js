const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getUserProfile,
  registerUser,
  userLogin,
  userLogout,
  getProfile,
} = require("../controllers/controller");

userRouter.get("/", getUserProfile);

userRouter.post("/register", registerUser);

userRouter.post("/login", userLogin);

userRouter.post("/logout", userLogout);

userRouter.get("/profile", authMiddleware, getProfile);

module.exports = userRouter;
