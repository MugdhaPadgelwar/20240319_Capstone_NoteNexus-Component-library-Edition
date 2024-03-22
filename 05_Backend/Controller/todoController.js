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
      // Create a new todo object using data from the request body
      const newTodo = new Todo({
        userId: req.body.userId,
        title: req.body.title,
        status: req.body.status || "pending",
      });

      // Validation
      try {
        validateTitle(newTodo.title);
        validateStatus(newTodo.status);
      } catch (error) {
        if (error.name === "ValidationError") {
          return res.status(400).json({ error: error.message }); // Bad Request
        }
        return res.status(500).json({ error: "Internal Server Error" }); // Internal Server Error
      }

      // Save the todo to the database
      const savedTodo = await newTodo.save();

      // Send the saved todo along with a success message as a response
      res.status(201).json({
        message: "Todo created successfully",
        todo: savedTodo,
      });
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
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
        return res.status(400).json({ message: "User ID is required" }); // Bad Request
      }

      // Query the database for todos associated with the user ID
      const todos = await Todo.find({ userId: userId });

      if (!todos || todos.length === 0) {
        return res
          .status(404)
          .json({ message: "No todos found for the provided user ID" }); // Not Found
      }

      // Send the todos data as a JSON response
      res.json(todos);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
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
        return res.status(400).json({ message: "Todo ID is required" }); // Bad Request
      }

      // Find the todo by its ID and update its fields
      const updatedTodo = await Todo.findByIdAndUpdate(todoId, req.body, {
        new: true,
      });

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" }); // Not Found
      }

      // Send the updated todo as a JSON response
      res.json(updatedTodo);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
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
        return res.status(400).json({ message: "Todo ID is required" }); // Bad Request
      }

      // Find the todo by its ID and delete it
      const deletedTodo = await Todo.findByIdAndDelete(todoId);

      if (!deletedTodo) {
        return res.status(404).json({ message: "Todo not found" }); // Not Found
      }

      // Send a success message as a JSON response
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = { addToDo, getTodoById, updateTodo, deleteTodo };
