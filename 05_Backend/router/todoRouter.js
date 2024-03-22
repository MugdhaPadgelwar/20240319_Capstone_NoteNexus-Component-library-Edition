// external imports
const express = require("express");
const router = express.Router();

// Load environment variables
require("dotenv").config();

// Import controller functions
const todoController = require("../controller/todoController");

// Import authentication middleware
const { verifyToken } = require("../middleware/auth");

//Protected Routes
router.use(verifyToken);
router.post("/add", todoController.addToDo);
router.get("/get", todoController.getTodoById);
router.put("/update", todoController.updateTodo);
router.delete("/delete", todoController.deleteTodo);

module.exports = router;
