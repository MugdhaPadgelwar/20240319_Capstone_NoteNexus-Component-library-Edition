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

    if (!userId || !html_code) {
      return res.status(400).json({
        message: "User ID, HTML code are required",
      });
    }

    const newPage = new Page({
      userId,
      html_code,
      css_code,
      javascript_code,
      status: status || "draft",
    });

    const savedPage = await newPage.save();

    res.json(savedPage);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({ error: "Validation Error: " + error.message });
    }

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
      const userId = req.query.userId;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const pages = await Page.find({ userId });

      if (!pages || pages.length === 0) {
        return res
          .status(404)
          .json({ message: "No pages found for the provided user ID" });
      }

      res.json(pages);
    } catch (error) {
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

      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      const page = await Page.findById(pageId);

      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

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

      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      if (!content && !status) {
        return res
          .status(400)
          .json({ message: "Content or status must be provided for update" });
      }

      const updatedPage = await Page.findByIdAndUpdate(
        pageId,
        { content, status },
        { new: true }
      );

      if (!updatedPage) {
        return res.status(404).json({ message: "Page not found" });
      }

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
      const pageId = req.query.id;

      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      const deletedPage = await Page.findByIdAndDelete(pageId);

      if (!deletedPage) {
        return res.status(404).json({ message: "Page not found" });
      }

      res.json({ message: "Page deleted successfully" });
    } catch (error) {
      if (error.name === "CastError") {
        return res.status(400).json({ message: "Invalid Page ID format" });
      }
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
