const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerUser,
  userLogin,
  userLogout,
  getProfile,
} = require("../controllers/controller");

userRouter.post("/register", registerUser);

userRouter.post("/login", userLogin);

userRouter.post("/logout", userLogout);

userRouter.get("/profile", authMiddleware, getProfile);

module.exports = userRouter;
