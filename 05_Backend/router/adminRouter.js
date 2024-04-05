// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import admin controller functions
const adminController = require("../controller/adminController");

// Import authentication middleware
const { verifyToken, isAdmin } = require("../middleware/auth");
router.put("/pages/comments", adminController.addComment);

router.get("/rejected", adminController.rejectedPages);
//Protected Routes
router.use(verifyToken, isAdmin);
router.get("/published-pages", adminController.publishedPages);
router.put("/update/review-status", adminController.updatePageStatusById);

module.exports = router;
