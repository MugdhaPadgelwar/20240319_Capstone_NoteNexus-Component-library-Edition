/**
 * Validates a username.
 * @param {string} name - The username to be validated.
 * @throws {Error} Throws an error if the name is empty or undefined.
 * @returns {void}
 */
const validateName = (name) => {
  if (!name) {
    throw new Error("Name is required.");
  }
};

/**
 * Validates an email address.
 * @param {string} email - The email address to be validated.
 * @throws {Error} Throws an error if the email is empty
 * @returns {void}
 */
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

/**
 * Validates a password.
 * @param {string} password - The password to be validated.
 * @throws {Error} Throws an error if the password is empty,
 * doesn't meet length requirements, or lacks required characters.
 * @returns {void}
 */
const validatePassword = (password) => {
  if (!password) {
    throw new Error("Password is required.");
  }
  if (password.length < 8 || password.length > 50) {
    throw new Error("Password must be between 8 and 50 characters long.");
  }
  if (!/[a-z]/.test(password)) {
    throw new Error("Password must contain at least one lowercase letter.");
  }
  if (!/[A-Z]/.test(password)) {
    throw new Error("Password must contain at least one uppercase letter.");
  }
  if (!/\d/.test(password)) {
    throw new Error("Password must contain at least one digit.");
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    throw new Error("Password must contain at least one special character.");
  }
};

/**
 * Validates a user role.
 * @param {string} role - The role to be validated.
 * @throws {Error} Throws an error if the role is empty
 * or not one of the predefined roles ('user' or 'admin').
 * @returns {void}
 */
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
