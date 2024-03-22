// validation function for username
const validateName = (name) => {
  if (!name) {
    throw new Error("Name is required.");
  }
};

// validation function for email
const validateEmail = (email) => {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (email.length > 100) {
    throw new Error("Email must be at most 100 characters long.");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }
};

// Validation function for password
const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required.");
  }
  if (password.length < 8 || password.length > 50) {
    throw new Error("Password must be between 8 and 50 characters long.");
  }
};

// Validation function for role
const validateRole = (role) => {
  if (!role) {
    throw new Error("Role is required.");
  }
  if (!["user", "admin"].includes(role)) {
    throw new Error("Invalid role.");
  }
};

const validateUser = (userData) => {
  validateName(userData.name);
  validateEmail(userData.email);
  validatePassword(userData.password);
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
};
