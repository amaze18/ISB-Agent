/**
 * @module userController
 * @description Controller module handling user-related operations and profile management
 */

/**
 * Database connection pool for executing SQL queries
 * @const {Object} pool
 */
const pool = require("../models/db");

/**
 * Retrieves a user's profile information from the database
 * @function getProfile
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object containing user_id
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - JSON response with user profile or error message
 */
exports.getProfile = async (req, res) => {
  // Extract user_id from the authenticated user object
  const user_id = req.user.user_id;

  try {
    /**
     * Query to fetch user profile data
     * Excludes sensitive information like password
     * Uses parameterized query for security
     */
    const userResult = await pool.query(
      "SELECT user_id, full_name, username, email, date_of_birth, gender, dark_mode_pref, is_active, registration_date, last_login, updated_at FROM users WHERE user_id = $1",
      [user_id]
    );

    // Handle case when user is not found in database
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Extract first row as it contains the user profile data
    const user = userResult.rows[0];

    // Return successful response with user profile data
    res.status(200).json({ user });
  } catch (error) {
    /**
     * Error handling for database operations
     * Logs the error for debugging and monitoring
     * Returns generic error message to client for security
     */
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
