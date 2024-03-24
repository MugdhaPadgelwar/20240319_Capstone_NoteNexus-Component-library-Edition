const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const UserToken = require("../models/UserToken");
const {
  validateUser,
  validateEmail,
  validatePassword,
} = require("../validators/userValidators");
const jwt = require("jsonwebtoken");

/**
 * Route to register a new user
 * @param {object} req - Express request object containing user
 *  registration data in the request body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing newly registered user data
 *  or error message
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Validate request body
    validateUser(req.body);

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document with provided user details
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new User document to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

    // Check if the error is a validation error
    if (
      error.name === "ValidationError" ||
      error.message.startsWith("ValidationError")
    ) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * POST endpoint for user login
 * @param {object} req - Express request object containing user login
 *  credentials in the request body
 * @param {object} res - Express response object
 * @returns {object} JSON response containing login status,
 *  JWT token, user role, user ID, and token expiration time or error message
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    try {
      validateEmail(email); // Validate email
      validatePassword(password);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }
    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      role: user.role,
      userId: user._id,
      expiresIn: 3600, // Token expires in 1 Month
    });
    console.log("success");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Route to handle forget password functionality
 * @param {object} req - Express request object containing user email in the request body
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure
 * of sending password reset instructions
 */
const forgetPassword = async (req, res, next) => {
  const email = req.body.email;

  try {
    // Find user by email
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });

    // If user not found, create and return a custom 404 error
    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    // Payload for JWT token
    const payload = {
      email: user.email,
    };

    // Expiry time for JWT token (in seconds)
    const expiryTime = 300;

    // Sign JWT token with payload and secret key
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiryTime,
    });

    // Save token in the database
    const newToken = new UserToken({
      userId: user._id,
      token: token,
    });

    try {
      // Attempt to save the token
      await newToken.save();

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mugdha.padgelwar2024@gmail.com",
          pass: "wxyw fpxk eipf bhxr",
        },
      });

      // Email options

      const mailOptions = {
        from: "mugdha.padgelwar2024@gmail.com",
        to: user.email,
        subject: "Password Reset Instructions",
        html: `
         <html> 
         <head> 
             <title>Password Reset Request</title> 
         </head> 
         <body> 
             <h1>Password reset request</h1> 
             <p>Dear ${user.userName},</p> 
             <p>We have received a request to reset your password for your account. To complete the password reset process, please click on the button below:</p>
             <a href="${process.env.LIVE_URL}/resetpassword/${token}" style="text-decoration: none;">
            <button style="background-color: #4CAF50; color: #ffffff; font-size: 16px; font-family: Helvetica, Arial, sans-serif; padding: 14px 20px; border: none; border-radius: 4px; cursor: pointer;">
              Reset Password
            </button>
             </a>
             <p>Please note that this link is only valid for 5 minutes. If you did not request a password reset, please discard this message.</p>
             <p>Thank you</p> 
         </body>
     </html>
              `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      // Send response
      res
        .status(200)
        .json({ success: true, message: "Password reset instructions sent" });
    } catch (error) {
      // If an error occurs during sending email, handle it
      return next(error);
    }
  } catch (error) {
    // If an error occurs during finding user or saving token, handle it
    return next(error);
  }
};

/**
 * Route to handle password reset functionality
 * @param {object} req - Express request object containing new password
 * in the request body and token in query parameters
 * @param {object} res - Express response object
 * @returns {object} JSON response indicating success or failure of password reset
 */
const resetpassword = async (req, res, next) => {
  try {
    const { newPassword } = req.body;
    const token = req.query.token; // Extracting token from query parameters

    // Check if token and newPassword are provided
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and newPassword are required" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const email = decoded.email;
      console.log(email);

      // Find user by ID
      const user = await User.findOne({ email: email });

      // Check if user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Encrypt the new password
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);

      // Update user's password
      user.password = encryptedPassword;

      try {
        // Save the updated user
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );

        // Respond with success message
        return res.status(200).json({ message: "Password reset successfully" });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Something went wrong" });
      }
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  forgetPassword,
  resetpassword,
};
