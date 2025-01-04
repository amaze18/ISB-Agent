// Import necessary modules
const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Import route handlers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const agentRoutes = require("./routes/agentRoutes");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000; // Define the port, default to 5000 if not specified in environment variables

// Middleware
// Enable Cross-Origin Resource Sharing (CORS) to allow requests from any origin
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json()); // Use built-in body-parser to parse JSON requests

// Define routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/agents", agentRoutes); // Agent-related routes

// Root Endpoint
// Define a simple route to check if the server is running
app.get("/", (req, res) => {
  res.send("Chatbot Backend is Running");
});

// Start the Server
// Listen on the specified port and log a message to the console
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
