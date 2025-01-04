/**
 * Authentication Middleware
 * Handles JWT token verification for protected routes
 * Ensures that only authenticated users can access protected resources
 */

// Import required dependencies
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} Response object if verification fails, calls next() if successful
 */
exports.verifyToken = (req, res, next) => {
  // Extract the authorization header from the request
  const authHeader = req.headers["authorization"];

  // Check if authorization header exists
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Extract the token from the Bearer format
  const token = authHeader.split(" ")[1];

  // Verify the token using the JWT_SECRET from environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Handle invalid or expired tokens
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach decoded user information to the request object for use in subsequent middleware/routes
    req.user = decoded;
    next(); // Proceed to the next middleware/route handler
  });
};
