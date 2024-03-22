// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import controller functions
const pageController = require("../controller/pageController");

// Import authentication middleware
const { verifyToken } = require("../middleware/auth");

//Protected Routes
router.use(verifyToken);
router.post("/add", pageController.createPage);
router.get("/user", pageController.getPageByUserId);
router.get("/get", pageController.getPageById);
router.put("/update", pageController.updatePageById);
router.delete("/delete", pageController.deleteByPageId);

module.exports = router;
