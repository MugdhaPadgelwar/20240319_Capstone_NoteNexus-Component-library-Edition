const Page = require("../models/Page");

// Import middleware
const { verifyToken, isAdmin } = require("../middleware/auth");

/**
 * Retrieves all published pages.
 * @param {Function} verifyToken - Middleware function to verify user token.
 * @param {Function} isAdmin - Middleware function to check if user is admin.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const publishedPages =
  (verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const publishedPages = await Page.find({
        $and: [{ status: "published" }, { review_status: "pending" }],
      });
      res.json(publishedPages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const rejectedPages = async (req, res) => {
  try {
    const publishedPages = await Page.find({ review_status: "rejected" });
    res.json(publishedPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Updates the status of a page by its ID.
 * @param {Function} verifyToken - Middleware function to verify user token.
 * @param {Function} isAdmin - Middleware function to check if user is admin.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updatePageStatusById =
  (verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const pageId = req.query.id;
      const { review_status } = req.body;

      if (!pageId) {
        return res.status(400).json({ message: "Page ID is required" });
      }

      if (!review_status) {
        return res
          .status(400)
          .json({ message: "status must be provided for update" });
      }

      const updatedPage = await Page.findByIdAndUpdate(
        pageId,
        { review_status },
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
 * Adds a comment to a page identified by its ID.
 * @param {Function} verifyToken - Middleware function to verify user token.
 * @param {Function} isAdmin - Middleware function to check if user is admin.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const addComment =
  (verifyToken,
  isAdmin,
  async (req, res) => {
    try {
      const id = req.query.id; // Extract id from query parameters
      const { comments } = req.body;

      if (!id) {
        return res
          .status(400)
          .json({ error: "Page ID is required in the query parameters" });
      }

      const updatedPage = await Page.findByIdAndUpdate(
        id,
        { $push: { comments: comments } },
        { new: true }
      );

      if (!updatedPage) {
        return res.status(404).json({ error: "Page not found" });
      }

      return res.json(updatedPage);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  });
module.exports = {
  publishedPages,
  addComment,
  rejectedPages,
  updatePageStatusById,
};
