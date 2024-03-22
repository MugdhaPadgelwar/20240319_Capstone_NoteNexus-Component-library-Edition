// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import controller functions
const userController = require("../controller/userController");

//API routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetpassword);

module.exports = router;
