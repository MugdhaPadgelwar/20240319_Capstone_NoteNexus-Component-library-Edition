const validateKanban = (data) => {
  const { title, description } = data;

  // Check if title is provided and is a non-empty string
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    throw new Error("Title is required and must be a non-empty string.");
  }

  // If description is provided, ensure it's a string
  if (description && typeof description !== "string") {
    throw new Error("Description must be a string.");
  }

  // Validation passed
  return true;
};

module.exports = {
  validateKanban,
};
