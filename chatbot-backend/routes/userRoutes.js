// Import the express module to create a router
const express = require("express");
// Create a new router instance
const router = express.Router();

// Import the userController to handle user-related requests
const userController = require("../controllers/userController");
// Import the authMiddleware to handle authentication and authorization
const authMiddleware = require("../middleware/authMiddleware");

// Define a route to get the user profile
// This route uses the authMiddleware to verify the user's token before allowing access
// If the token is valid, the userController.getProfile function is called to handle the request
router.get("/profile", authMiddleware.verifyToken, userController.getProfile);

// Export the router to be used in other parts of the application
module.exports = router;
