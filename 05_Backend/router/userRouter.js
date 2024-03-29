// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import controller functions
const userController = require("../controller/userController");

router.get("/rejected", userController.rejectedPages);

//API routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forget-password", userController.forgetPassword);
router.put("/resetpassword", userController.resetpassword);

module.exports = router;
