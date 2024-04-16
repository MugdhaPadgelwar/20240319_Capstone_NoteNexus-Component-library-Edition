/**
 * Validates Kanban data.
 * @param {Object} data - The Kanban data to be validated.
 * @param {string} data.title - The title of the Kanban data.
 * @param {string} [data.description] - The description of
 * the Kanban data (optional).
 * @throws {Error} Throws an error if the title is missing,
 *  not a string, or an empty string.
 * @returns {boolean} Returns true if validation passed.
 */

const validateKanban = (data) => {
  const { title, description } = data;

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Title is required and must be a non-empty string.");
  }

  if (description && typeof description !== "string") {
    throw new Error("Description must be a string.");
  }

  return true;
};

module.exports = {
  validateKanban,
};
