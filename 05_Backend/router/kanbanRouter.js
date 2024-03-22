// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import controller functions
const kanbanController = require("../controller/kanbanController");

// Import authentication middleware
const { verifyToken } = require("../middleware/auth");

//Protected Routes
router.use(verifyToken);
router.post("/add", kanbanController.addKanban);
router.get("/user/get", kanbanController.getKanbanByUserId);
router.get("/get", kanbanController.getKanbanById);
router.put("/update", kanbanController.updateKanbanById);
router.delete("/delete", kanbanController.deleteKanbanById);

module.exports = router;
