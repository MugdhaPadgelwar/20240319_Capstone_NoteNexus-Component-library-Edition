const KanbanBoard = require("../models/Kanban");
// Import middleware
const { verifyToken } = require("../middleware/auth");

const { validateKanban } = require("../validators/kanbanValidators");

/**
 * Route to create a new kanban board
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure
 */
const addKanban =
  (verifyToken,
  async (req, res) => {
    try {
      // Destructure request body to extract necessary fields
      const { userId, title, description } = req.body;

      // Check if all required fields are provided
      if (!userId) {
        return res.status(400).json({ message: "UserId is required" });
      }

      // Validation
      try {
        validateKanban({ title, description });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

      // Create a new kanban board object
      const newKanbanBoard = new KanbanBoard({
        userId,
        title,
        description,
      });

      // Save the kanban board to the database
      const savedKanbanBoard = await newKanbanBoard.save();

      // Send a success response with the created kanban board
      res.status(201).json(savedKanbanBoard);
    } catch (error) {
      // Check for specific error types and return appropriate status codes
      if (error.name === "ValidationError") {
        return res.status(422).json({ error: error.message });
      }
      // For any other errors, return a generic 500 status code
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to get kanban boards by user ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {string} req.query.userId - User ID to filter kanban boards
 * @param {object} res - Express response object
 * @returns {object} JSON response containing kanban boards data or error message
 */
const getKanbanByUserId =
  (verifyToken,
  async (req, res) => {
    try {
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Query the database for kanban boards associated with the user ID
      const kanbanBoards = await KanbanBoard.find({ userId });

      if (!kanbanBoards || kanbanBoards.length === 0) {
        return res
          .status(404)
          .json({ message: "No kanban boards found for the provided user ID" }); // Not Found
      }

      // Send the kanban boards data as a JSON response
      res.json(kanbanBoards);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to get kanban board by kanban ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {string} req.query._id - Kanban ID to retrieve the kanban board
 * @param {object} res - Express response object
 * @returns {object} JSON response containing kanban board data or error message
 */
const getKanbanById =
  (verifyToken,
  async (req, res) => {
    try {
      const kanbanId = req.query._id;

      if (!kanbanId) {
        return res.status(400).json({ message: "Kanban ID is required" }); // Bad Request
      }

      // Query the database for the Kanban board by its ID
      const kanbanBoard = await KanbanBoard.findById(kanbanId);

      if (!kanbanBoard) {
        return res.status(404).json({ message: "Kanban board not found" }); // Not Found
      }

      // Send the Kanban board data as a JSON response
      res.json(kanbanBoard);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to update kanban board by kanban ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing route parameters and body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing updated kanban board data or error message
 */

const updateKanbanById =
  (verifyToken,
  async (req, res) => {
    try {
      const kanbanId = req.query._id;

      // Check if the Kanban ID is provided
      if (!kanbanId) {
        return res.status(400).json({ message: "Kanban ID is required" }); // Bad Request
      }

      // Extract the updated Kanban board data from the request body
      const { title, description, status } = req.body;

      // Validation
      try {
        validateKanban({ title, description });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

      // Query the database for the Kanban board by its ID and update it
      let kanbanBoard = await KanbanBoard.findById(kanbanId);

      if (!kanbanBoard) {
        return res.status(404).json({ message: "Kanban board not found" }); // Not Found
      }

      // Update the Kanban board fields
      if (title) kanbanBoard.title = title;
      if (description) kanbanBoard.description = description;
      if (status) kanbanBoard.status = status;

      // Save the updated Kanban board to the database
      kanbanBoard = await kanbanBoard.save();

      // Send the updated Kanban board data as a JSON response
      res.json(kanbanBoard);
    } catch (error) {
      // Check for specific error types and return appropriate status codes
      if (error.name === "ValidationError") {
        return res.status(422).json({ error: error.message }); // Unprocessable Entity
      }
      // For any other errors, return a generic 500 status code
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to delete kanban board by kanban ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure
 */
const deleteKanbanById =
  (verifyToken,
  async (req, res) => {
    try {
      const kanbanId = req.query._id;

      // Check if the Kanban ID is provided
      if (!kanbanId) {
        return res.status(400).json({ message: "Kanban ID is required" }); // Bad Request
      }

      // Find the Kanban board by its ID and delete it
      const deletedKanban = await KanbanBoard.findByIdAndDelete(kanbanId);

      if (!deletedKanban) {
        return res.status(404).json({ message: "Kanban board not found" }); // Not Found
      }

      // Send a success message as a JSON response
      res.json({ message: "Kanban board deleted successfully" });
    } catch (error) {
      // For specific error types, return appropriate status codes and error messages
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Kanban ID format" }); // Bad Request
      }
      // For any other errors, return a generic 500 status code and error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = {
  addKanban,
  getKanbanByUserId,
  getKanbanById,
  updateKanbanById,
  deleteKanbanById,
};
