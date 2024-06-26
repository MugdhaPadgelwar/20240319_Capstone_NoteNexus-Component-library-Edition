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

    validateUser(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: "Email is already in use.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);

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

    try {
      validateEmail(email);
      validatePassword(password);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful.",
      token: token,
      role: user.role,
      userId: user._id,
      expiresIn: 7200,
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
    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return next(error);
    }

    const payload = {
      email: user.email,
    };

    const expiryTime = 300;

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: expiryTime,
    });

    const newToken = new UserToken({
      userId: user._id,
      token: token,
    });

    try {
      await newToken.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "mugdha.padgelwar2024@gmail.com",
          pass: "wxyw fpxk eipf bhxr",
        },
      });

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

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ success: true, message: "Password reset instructions sent" });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
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
    const token = req.query.token;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and newPassword are required" });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      const email = decoded.email;
      console.log(email);

      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);

      user.password = encryptedPassword;

      try {
        const updateUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $set: user },
          { new: true }
        );

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

/**
 * Retrieves all published pages.
 * @param {Function} verifyToken - Middleware function to verify user token.
 * @param {Function} isAdmin - Middleware function to check if user is admin.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const rejectedPages = async (req, res) => {
  try {
    const publishedPages = await Page.find({ review_status: "rejected" });
    res.json(publishedPages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  forgetPassword,
  resetpassword,
  rejectedPages,
};
