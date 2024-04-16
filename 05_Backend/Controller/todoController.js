const Todo = require("../models/Todo");
// Import middleware
const { verifyToken } = require("../middleware/auth");
const {
  validateTitle,
  validateStatus,
} = require("../validators/todoValidators");

/**
 * Route to handle POST request to create a new todo
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing request body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing created todo data or error message
 */
const addToDo =
  (verifyToken,
  async (req, res) => {
    try {
      const newTodo = new Todo({
        userId: req.body.userId,
        title: req.body.title,
        status: req.body.status || "pending",
      });

      try {
        validateTitle(newTodo.title);
        validateStatus(newTodo.status);
      } catch (error) {
        if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const savedTodo = await newTodo.save();

      res.status(201).json({
        message: "Todo created successfully",
        todo: savedTodo,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to get todos by user ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response containing todos data or error message
 */
const getTodoById =
  (verifyToken,
  async (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const todos = await Todo.find({ userId: userId });

      if (!todos || todos.length === 0) {
        return res
          .status(404)
          .json({ message: "No todos found for the provided user ID" });
      }

      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to update todo by todo ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters and body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing updated todo data or error message
 */
const updateTodo =
  (verifyToken,
  async (req, res) => {
    try {
      const todoId = req.query.todoId;

      if (!todoId) {
        return res.status(400).json({ message: "Todo ID is required" });
      }

      const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
        new: true,
      });

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to delete todo by todo ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure
 */
const deleteTodo =
  (verifyToken,
  async (req, res) => {
    try {
      const todoId = req.query.todoId;

      if (!todoId) {
        return res.status(400).json({ message: "Todo ID is required" });
      }

      const deletedTodo = await Todo.findByIdAndDelete(todoId);

      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = { addToDo, getTodoById, updateTodo, deleteTodo };
