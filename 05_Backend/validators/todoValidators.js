/**
 * Validates a title.
 * @param {string} title - The title to be validated.
 * @throws {Error} Throws an error if the title is empty.
 * @returns {void}
 */
const validateTitle = (title) => {
  if (!title) {
    throw new Error("Title is required.");
  }
};

/**
 * Validates a status.
 * @param {string} status - The status to be validated.
 * @throws {Error} Throws an error if the status is empty or not one of the predefined statuses ('pending' or 'completed').
 * @returns {void}
 */
const validateStatus = (status) => {
  if (!status) {
    throw new Error("Status is required.");
  }
  if (status !== "pending" && status !== "completed") {
    throw new Error(
      "Invalid status. Status must be either 'pending' or 'completed'."
    );
  }
};

module.exports = {
  validateTitle,
  validateStatus,
};
