/**
 * Agent Controller Module
 * Handles all operations related to AI agents including creation, retrieval, and management
 * Provides RESTful API endpoints for agent-related operations
 */

const { v4: uuidv4 } = require("uuid"); // Import UUID library for generating unique identifiers
const pool = require("../models/db"); // Import database connection pool

/**
 * Creates a new AI agent for a user
 * @route POST /api/agents
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object containing user_id
 * @param {Object} req.body - Request body containing agent details
 * @param {string} req.body.name - Name of the agent (required)
 * @param {string} req.body.gender - Gender of the agent
 * @param {string} req.body.relationship_status - Relationship status
 * @param {Array} req.body.personality_traits - Array of personality traits
 * @param {Array} req.body.interests - Array of interests
 * @param {string} req.body.image_url - URL of agent's image
 * @param {string} req.body.city - City location of the agent
 * @param {Object} res - Express response object
 * @returns {Object} Response with agent_id or error message
 */
exports.createAgent = async (req, res) => {
  // Extract user_id from authenticated request
  const user_id = req.user?.user_id;
  console.log("User ID from token:", user_id);
  console.log("Request Body:", req.body);

  // Destructure required fields from request body
  const {
    name,
    agent_gender: gender,
    relationship_type: relationship_status,
    personality_traits,
    interests,
    image_url,
    city,
  } = req.body;

  // Validate required fields
  if (!name) {
    return res.status(400).json({ message: "Agent name is required." });
  }

  try {
    // Generate unique identifier for the new agent
    const agent_id = uuidv4();

    // Insert new agent record into database with current timestamp
    await pool.query(
      `INSERT INTO ai_agents (
        agent_id, user_id, name, gender, relationship_status,
        personality_traits, interests, image_url, city,
        creation_date, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        NOW(), NOW()
      )`,
      [
        agent_id,
        user_id,
        name,
        gender,
        relationship_status,
        JSON.stringify(personality_traits || []), // Convert arrays to JSON strings
        JSON.stringify(interests || []),
        image_url,
        city,
      ]
    );

    // Respond with success message and agent_id
    res
      .status(201)
      .json({ message: "AI agent created successfully.", agent_id });
  } catch (error) {
    console.error("Create Agent Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Retrieves all active agents for a specific user
 * @route GET /api/agents
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object
 * @param {Object} res - Express response object
 * @returns {Object} Array of agent objects or error message
 */
exports.getAgents = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    // Query database for all active agents belonging to the user
    const agentsResult = await pool.query(
      "SELECT * FROM ai_agents WHERE user_id = $1 AND is_active = TRUE",
      [user_id]
    );

    // Respond with the list of agents
    res.status(200).json({ agents: agentsResult.rows });
  } catch (error) {
    console.error("Get agents error:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Retrieves a specific agent by ID for a user
 * @route GET /api/agents/:agent_id
 * @param {Object} req - Express request object
 * @param {Object} req.user - Authenticated user object
 * @param {string} req.params.agent_id - ID of the agent to retrieve
 * @param {Object} res - Express response object
 * @returns {Object} Agent object or error message
 */
exports.getAgentById = async (req, res) => {
  const user_id = req.user.user_id;
  const agent_id = req.params.agent_id;

  console.log("Fetching agent by ID:", { user_id, agent_id });

  try {
    // Query database for specific agent, ensuring it belongs to the user and is active
    const agentResult = await pool.query(
      "SELECT * FROM ai_agents WHERE user_id = $1 AND agent_id = $2 AND is_active = TRUE",
      [user_id, agent_id]
    );

    if (agentResult.rows.length === 0) {
      console.log("Agent not found in the database.");
      return res.status(404).json({ message: "Agent not found." });
    }

    const agent = agentResult.rows[0];
    console.log("Agent found:", agent);

    // Respond with the agent details
    res.status(200).json({ agent });
  } catch (error) {
    console.error("Get Agent by ID Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
