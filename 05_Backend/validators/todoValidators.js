const validateTitle = (title) => {
  if (!title) {
    throw new Error("Title is required.");
  }
};

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
