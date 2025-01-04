/**
 * Database Configuration Module
 * This module sets up and exports a PostgreSQL connection pool using the 'pg' package.
 * It uses environment variables for secure configuration management.
 */

// Import required dependencies
const { Pool } = require("pg");
require("dotenv").config();

/**
 * PostgreSQL Connection Pool Configuration
 * Creates a new connection pool with credentials from environment variables
 * @property {string} user - Database user from DB_USER env variable
 * @property {string} host - Database host from DB_HOST env variable
 * @property {string} database - Database name from DB_NAME env variable
 * @property {string} password - Database password from DB_PASS env variable
 * @property {number} port - Database port from DB_PORT env variable
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

/**
 * Export the connection pool for use in other modules
 * This pool can be used to execute queries and manage database connections
 */
module.exports = pool;
