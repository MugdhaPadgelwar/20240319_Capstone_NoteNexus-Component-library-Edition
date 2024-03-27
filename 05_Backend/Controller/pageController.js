const Page = require("../models/Page");

// Import middleware
const { verifyToken } = require("../middleware/auth");

/**
 * Route to create a new page
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing request body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing created page data or error message
 */
const createPage = async (req, res) => {
  try {
    const { userId, html_code, css_code, javascript_code, status } = req.body;

    // Check if all required fields are provided
    if (!userId || !html_code) {
      return res.status(400).json({
        message: "User ID, HTML code are required",
      }); // Bad Request
    }

    // Create a new page document
    const newPage = new Page({
      userId,
      html_code,
      css_code,
      javascript_code,
      status: status || "draft", // Set default status if not provided
    });

    // Save the new page to the database
    const savedPage = await newPage.save();

    // Send the saved page data as a JSON response
    res.json(savedPage);
  } catch (error) {
    // Check for specific error types and return appropriate status codes and messages
    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({ error: "Validation Error: " + error.message }); // Unprocessable Entity
    }
    // For any other errors, return a generic 500 status code and error message
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Route to get pages by user ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response containing pages data or error message
 */
const getPageByUserId =
  (verifyToken,
  async (req, res) => {
    try {
      const userId = req.query.userId; // Extract user ID from query parameter

      // Check if user ID is provided
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" }); // Bad Request
      }

      // Query the database for pages by user ID
      const pages = await Page.find({ userId });

      if (!pages || pages.length === 0) {
        return res
          .status(404)
          .json({ message: "No pages found for the provided user ID" }); // Not Found
      }

      // Send the pages data as a JSON response
      res.json(pages);
    } catch (error) {
      // If there's an error, send a 500 status code and the error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to get page by page ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response containing page data or error message
 */
const getPageById =
  (verifyToken,
  async (req, res) => {
    try {
      const pageId = req.query.id;

      // Check if page ID is provided
      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      // Query the database for the page by its ID
      const page = await Page.findById(pageId);

      // Check if page is found
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      // Send the page data as a JSON response
      res.json(page);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Page ID format" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to update page by page ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters and body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing updated page data or error message
 */
const updatePageById =
  (verifyToken,
  async (req, res) => {
    try {
      const pageId = req.query.id;
      const { content, status } = req.body;

      // Check if page ID is provided
      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      // Check if content or status are provided
      if (!content && !status) {
        return res
          .status(400)
          .json({ message: "Content or status must be provided for update" });
      }

      // Find the page by its ID and update it
      const updatedPage = await Page.findByIdAndUpdate(
        pageId,
        { content, status },
        { new: true }
      );

      // Check if page is found
      if (!updatedPage) {
        return res.status(404).json({ message: "Page not found" }); // Not Found
      }

      // Send the updated page data as a JSON response
      res.json(updatedPage);
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Page ID format" });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

/**
 * Route to delete page by page ID
 * @param {function} verifyToken - Function to verify authentication token
 * @param {object} req - Express request object containing query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure
 */
const deleteByPageId =
  (verifyToken,
  async (req, res) => {
    try {
      const pageId = req.query.id; // Extract page ID from query parameter

      // Check if page ID is provided
      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" }); // Bad Request
      }

      // Find the page by its ID and delete it
      const deletedPage = await Page.findByIdAndDelete(pageId);

      // Check if page is found and deleted
      if (!deletedPage) {
        return res.status(404).json({ message: "Page not found" }); // Not Found
      }

      // Send a success message as a JSON response
      res.json({ message: "Page deleted successfully" });
    } catch (error) {
      // For specific error types, return appropriate status codes and error messages
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Page ID format" }); // Bad Request
      }
      // For any other errors, return a generic 500 status code and error message
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = {
  createPage,
  getPageByUserId,
  getPageById,
  updatePageById,
  deleteByPageId,
};
