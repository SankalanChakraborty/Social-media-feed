const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  try {
    if (!userName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ status: "Error", message: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "Error", message: "Passwords do not match" });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "Error", message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      userName,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ status: "OK", message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Error registering user", error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // true in production (https)
    sameSite: "Strict",
    maxAge: 60 * 60 * 1000,
  });

  res.status(200).json({ status: "OK", message: "Login successful", token });
};

const userLogout = async (req, res) => {
  console.log("Logging out user with token:", req.cookies?.token);
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // true in production (https)
  });
  res.status(200).json({ status: "OK", message: "Logout successful" });
};

const getProfile = async (req, res) => {
  const user = await userModel.findById(req.user.userId).select("-password");
  res.json(user);
};

module.exports = {
  registerUser,
  userLogin,
  userLogout,
  getProfile,
};
