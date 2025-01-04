/**
 * Authentication Controller
 * Handles user registration and login functionality
 * Security considerations:
 * - Passwords are hashed using bcrypt
 * - JWT tokens expire in 1 hour
 * - Email validation using regex
 * - SQL injection prevention using parameterized queries
 */

// Import necessary modules
const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const { v4: uuidv4 } = require("uuid"); // For generating unique user IDs
const pool = require("../models/db"); // Database connection pool
require("dotenv").config(); // Load environment variables from .env file

/**
 * Email validation helper function
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email format is valid
 * Limitations: Basic regex validation, doesn't check for all edge cases
 * Consider using a more robust email validation library for production
 */
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/; // Regular expression for email validation
  return re.test(email); // Test the email against the regex
}

/**
 * User Registration Handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * Request body requirements:
 * - username: Unique username
 * - email: Valid email address
 * - password: User's password (will be hashed)
 *
 * Security measures:
 * - Password hashing with salt
 * - Unique user_id generation
 * - Duplicate username/email check
 *
 * Edge cases handled:
 * - Missing required fields
 * - Invalid email format
 * - Duplicate username/email
 * - Database errors
 */
exports.register = async (req, res) => {
  const { username, email, password } = req.body; // only these required

  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    // Validate input fields
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if username or email already exists in the database
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    // Hash the user's password
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate a unique user ID
    const user_id = uuidv4();

    // Insert the new user into the database
    await pool.query(
      `INSERT INTO users (
        user_id, username, email, password_hash, registration_date, updated_at
      ) VALUES (
        $1, $2, $3, $4, NOW(), NOW()
      )`,
      [user_id, username, email, hashedPassword]
    );

    // Generate a JWT token for the new user
    const token = jwt.sign({ user_id, username }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully.", token });
  } catch (error) {
    console.error("Registration error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error." }); // Respond with server error message
  }
};

/**
 * User Login Handler
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 *
 * Request body requirements:
 * - username_or_email: User's username or email
 * - password: User's password
 *
 * Security features:
 * - Secure password comparison using bcrypt
 * - JWT token generation
 * - Last login tracking
 *
 * Edge cases handled:
 * - Missing credentials
 * - Invalid credentials
 * - Non-existent user
 * - Database errors
 *
 * Limitations:
 * - No rate limiting implemented
 * - No account lockout after failed attempts
 * - Token expiration not configurable
 */
exports.login = async (req, res) => {
  const { username_or_email, password } = req.body; // Extract login details from request body

  try {
    // Validate input fields
    if (!username_or_email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields." });
    }

    // Check if user exists in the database
    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [username_or_email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = userResult.rows[0]; // Get the user details

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Update the last login timestamp for the user
    await pool.query(
      "UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE user_id = $1",
      [user.user_id]
    );

    // Generate a JWT token for the user
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Respond with success message and token
    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ message: "Server error." }); // Respond with server error message
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Extract user_id from token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.user_id;

    const { full_name, date_of_birth, gender } = req.body;

    // Validate input
    if (!full_name || !date_of_birth || !gender) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Update user details
    await pool.query(
      "UPDATE users SET full_name=$1, date_of_birth=$2, gender=$3, updated_at=NOW() WHERE user_id=$4",
      [full_name, date_of_birth, gender, user_id]
    );

    return res.status(200).json({
      message: "User details updated successfully.",
      token: jwt.sign({ user_id }, process.env.JWT_SECRET, { expiresIn: "1h" }),
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { email, name, oauth_id } = req.body;

    if (!email || !oauth_id) {
      return res
        .status(400)
        .json({ message: "Missing required Google credentials" });
    }

    // Check if user exists with this email
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    let user;
    if (existingUser.rows.length > 0) {
      user = existingUser.rows[0];

      // If user exists but without Google oauth_id, update their record
      if (!user.oauth_id) {
        await pool.query(
          `UPDATE users 
           SET oauth_id = $1, oauth_provider = 'google', email_verified = true, 
               updated_at = NOW()
           WHERE user_id = $2`,
          [oauth_id, user.user_id]
        );
      }
    } else {
      // Create new user
      const user_id = uuidv4();
      const username = `user_${Math.random().toString(36).substr(2, 9)}`;

      await pool.query(
        `INSERT INTO users (
          user_id, username, email, full_name, oauth_id, oauth_provider, 
          email_verified, registration_date, updated_at
        ) VALUES ($1, $2, $3, $4, $5, 'google', true, NOW(), NOW())`,
        [user_id, name, email, username, oauth_id]
      );

      const newUser = await pool.query(
        "SELECT * FROM users WHERE user_id = $1",
        [user_id]
      );
      user = newUser.rows[0];
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      isNewUser: !existingUser.rows.length,
      message: "Google authentication successful",
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res
      .status(500)
      .json({ message: "Server error during Google authentication" });
  }
};
