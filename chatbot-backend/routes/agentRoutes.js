// Import the express module to create a router
const express = require("express");
const router = express.Router();

// Import the agent controller which contains the logic for handling agent-related requests
const agentController = require("../controllers/agentController");

// Import the authentication middleware to protect routes
const authMiddleware = require("../middleware/authMiddleware");

// Route to create a new AI agent
// This route is protected by the verifyToken middleware to ensure only authenticated users can create an agent
router.post("/", authMiddleware.verifyToken, agentController.createAgent);

// Route to get all AI agents for a user
// This route is also protected by the verifyToken middleware to ensure only authenticated users can access their agents
router.get("/", authMiddleware.verifyToken, agentController.getAgents);

// Route to get a specific AI agent by its ID
// The :agent_id parameter in the URL is used to identify the specific agent
// This route is protected by the verifyToken middleware to ensure only authenticated users can access their agents
router.get(
  "/:agent_id",
  authMiddleware.verifyToken,
  agentController.getAgentById
);

// Export the router to be used in other parts of the application
module.exports = router;
