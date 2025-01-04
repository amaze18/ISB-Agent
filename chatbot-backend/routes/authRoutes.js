/**
 * Authentication Routes Module
 *
 * This module defines the routing logic for user authentication operations.
 * It handles both registration and login functionalities by connecting
 * Express routes to their corresponding controller methods.
 *
 * @module authRoutes
 */

const express = require("express");

// Initialize Express Router to create modular route handlers
const router = express.Router();

/**
 * Import the authentication controller that contains the business logic
 * for user registration and login operations. This controller handles
 * data validation, user creation, and JWT token generation.
 */
const authController = require("../controllers/authController");

/**
 * POST /auth/register
 *
 * User Registration Route
 * Handles new user account creation process.
 * Expected request body: {
 *   username: string,
 *   email: string,
 *   password: string
 * }
 * Response: JWT token upon successful registration
 */
router.post("/register", authController.register);

/**
 * POST /auth/login
 *
 * User Login Route
 * Authenticates existing users and provides access tokens.
 * Expected request body: {
 *   email: string,
 *   password: string
 * }
 * Response: JWT token upon successful authentication
 */
router.post("/login", authController.login);

/**
 * PUT /auth/update-user
 *
 * User Update Route
 * Updates user details such as full_name, date_of_birth, and gender.
 * Expected request body: {
 *   full_name: string,
 *   date_of_birth: string,
 *   gender: string
 * }
 * Response: Success message upon successful update
 */
router.put("/update-user", authController.updateUser);

/**
 * POST /auth/google
 *
 * Google Authentication Route
 * Handles user authentication via Google.
 * Expected request body: {
 *   token: string
 * }
 * Response: JWT token upon successful authentication
 */
router.post("/google", authController.googleAuth);

// Export the configured router for use in the main application
module.exports = router;
