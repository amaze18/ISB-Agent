# Table of Contents

1. [CultureVo - AI Cultural Companion](#1-culturevo---ai-cultural-companion)
   - [Overview](#overview)
   - [Key Features](#key-features)
     - [1. AI Agent Interactions](#1-ai-agent-interactions)
     - [2. User Management](#2-user-management)
     - [3. Chat Interface](#3-chat-interface)
   - [Technology Stack](#technology-stack)
     - [Frontend](#frontend)
     - [Backend](#backend)
     - [Development Tools](#development-tools)
   - [Target Audience](#target-audience)

2. [Getting Started](#2-getting-started)
   - [Prerequisites](#prerequisites)
     - [Required Software](#1-required-software)
     - [Code Editor](#2-code-editor)
   - [Installation Steps](#installation-steps)
     - [1. Clone the Repository](#1-clone-the-repository)
     - [2. Backend Setup (`chatbot-backend`)](#2-backend-setup-chatbot-backend)
     - [3. Database Setup](#3-database-setup)
     - [4. Frontend Setup (`chatbot-frontend`)](#4-frontend-setup-chatbot-frontend)
   - [Starting the Application](#starting-the-application)
     - [1. Start Backend Server](#1-start-backend-server)
     - [2. Start Frontend Development Server](#2-start-frontend-development-server)
   - [Verification Steps](#verification-steps)
   - [Common Issues & Solutions](#common-issues--solutions)

3. [Architecture](#3-architecture)
   - [Overview](#overview-1)
   - [High-Level System Diagram](#high-level-system-diagram)
   - [Directory Structure](#directory-structure)
     - [Backend (`chatbot-backend`)](#backend-chatbot-backend)
     - [Frontend (`chatbot-frontend`)](#frontend-chatbot-frontend)
   - [Interaction Between Frontend and Backend](#interaction-between-frontend-and-backend)
     - [Data Flow Diagram](#data-flow-diagram)
     - [Interaction Steps](#interaction-steps)
   - [Summary](#summary)

4. [Backend Documentation](#4-backend-documentation)
   - [Overview](#overview-2)
   - [Key Components](#key-components)
     - [1. Controllers](#1-controllers)
     - [2. Middleware](#2-middleware)
     - [3. Models](#3-models)
     - [4. Routes](#4-routes)
   - [Request Handling and Data Flow](#request-handling-and-data-flow)
     - [1. Handling Requests](#1-handling-requests)
     - [2. Authentication Flow](#2-authentication-flow)
     - [3. Authentication Middleware](#3-authentication-middleware)
     - [4. Database Operations](#4-database-operations)
     - [5. AI Agent Management](#5-ai-agent-management)
   - [Code Snippets for Important Functionalities](#code-snippets-for-important-functionalities)
     - [1. User Registration with JWT](#1-user-registration-with-jwt)
     - [2. User Login and Token Generation](#2-user-login-and-token-generation)
     - [3. Protected Route Example](#3-protected-route-example)
   - [Best Practices Implemented](#best-practices-implemented)
     - [1. Modularity](#1-modularity)
     - [2. Security](#2-security)
     - [3. Error Handling](#3-error-handling)
     - [4. Performance](#4-performance)
     - [5. Scalability](#5-scalability)

5. [Frontend Documentation](#5-frontend-documentation)
   - [Summary](#summary)
   - [Key Components and Their Responsibilities](#key-components-and-their-responsibilities)
     - [1. Entry Point](#1-entry-point)
       - [`src/App.js`](#srcappjs)
     - [2. Components](#2-components)
       - [**LandingPage**](#landingpage)
       - [**RegistrationFlow**](#registrationflow)
       - [**Login**](#login)
       - [**Home**](#home)
       - [**Chats**](#chats)
       - [**Profile**](#profile)
       - [**NewAgent**](#newagent)
     - [3. State Management](#3-state-management)
       - [`src/context/DataContext.js`](#srccontextdatacontextjs)
     - [4. Routing](#4-routing)
     - [5. Styling](#5-styling)
     - [6. API Services](#6-api-services)
       - [`src/services/apiClient.js`](#srcservicesapiclientjs)
     - [7. Utilities and Hooks](#7-utilities-and-hooks)
   - [Example Snippets](#example-snippets)
     - [1. Implementing Navigation with React Router](#1-implementing-navigation-with-react-router)
     - [2. Using Context for State Management](#2-using-context-for-state-management)
     - [3. Making API Calls with Axios](#3-making-api-calls-with-axios)
     - [4. Styling Components with CSS](#4-styling-components-with-css)
     - [5. Responsive Sidebar in Chats](#5-responsive-sidebar-in-chats)

6. [Database Documentation](#6-database-documentation)
   - [Overview](#overview-1)
   - [Database Schema](#database-schema)
     - [Entity-Relationship Diagram](#entity-relationship-diagram)
     - [Table Descriptions](#table-descriptions)
       - [1. `users`](#1-users)
       - [2. `agents`](#2-agents)
   - [Key Queries and Operations](#key-queries-and-operations)
     - [1. User Registration](#1-user-registration)
     - [2. User Login](#2-user-login)
     - [3. Update Last Login](#3-update-last-login)
     - [4. Create AI Agent](#4-create-ai-agent)
     - [5. Retrieve User's Agents](#5-retrieve-users-agents)
   - [Examples of Database Interactions](#examples-of-database-interactions)
     - [1. Registering a New User](#1-registering-a-new-user)
     - [2. Creating an AI Agent](#2-creating-an-ai-agent)
     - [3. Retrieving User Profile](#3-retrieving-user-profile)
   - [Best Practices for Database Management](#best-practices-for-database-management)
     - [1. Use Parameterized Queries](#1-use-parameterized-queries)
     - [2. Connection Pooling](#2-connection-pooling)
     - [3. Error Handling](#3-error-handling-1)
     - [4. Data Validation](#4-data-validation)
     - [5. Secure Password Storage](#5-secure-password-storage)
     - [6. UUIDs for Primary Keys](#6-uuids-for-primary-keys)
     - [7. Indexing](#7-indexing)
     - [9. Foreign Key Constraints](#9-foreign-key-constraints)
     - [10. Database Normalization](#10-database-normalization)
   - [Additional Considerations](#additional-considerations)
     - [1. Scaling](#1-scaling)
     - [2. Caching](#2-caching)
     - [3. Data Backup and Recovery](#3-data-backup-and-recovery)
     - [4. Monitoring and Alerting](#4-monitoring-and-alerting)
     - [5. Use of ORMs](#5-use-of-orms)

7. [API Documentation](#7-api-documentation)
   - [Base URL](#base-url)
   - [Authentication](#authentication)
   - [Endpoints](#endpoints)
     - [1. User Registration](#1-user-registration)
     - [2. User Login](#2-user-login)
     - [3. Create AI Agent](#3-create-ai-agent)
     - [4. Get User's Agents](#4-get-users-agents)
     - [5. Get Specific Agent](#5-get-specific-agent)
     - [6. Get User Profile](#6-get-user-profile)
   - [Error Format](#error-format)
   - [Authentication Format](#authentication-format)
   - [Notes](#notes)

8. [Deployment Documentation](#8-deployment-documentation)
   - [Overview](#overview-2)
   - [Environment Configuration](#environment-configuration)
     - [Backend Configuration (`.env` file)](#backend-configuration-env-file)
     - [Frontend Configuration (`.env` file)](#frontend-configuration-env-file)
   - [Deployment Instructions](#deployment-instructions)
     - [Step 1: Launch an EC2 Instance](#step-1-launch-an-ec2-instance)
     - [Step 2: Connect to Your EC2 Instance](#step-2-connect-to-your-ec2-instance)
     - [Step 3: Update System Packages](#step-3-update-system-packages)
     - [Step 4: Install Node.js and npm](#step-4-install-nodejs-and-npm)
     - [Step 5: Install PostgreSQL](#step-5-install-postgresql)
     - [Step 6: Configure PostgreSQL](#step-6-configure-postgresql)
     - [Step 7: Clone Your Project Repository](#step-7-clone-your-project-repository)
     - [Step 8: Deploy the Backend](#step-8-deploy-the-backend)
     - [Step 9: Deploy the Frontend](#step-9-deploy-the-frontend)
     - [Step 10: Automate Processes with PM2](#step-10-automate-processes-with-pm2)
     - [Step 11: Configure Security and Firewall](#step-11-configure-security-and-firewall)
     - [Step 12: Update Frontend API Endpoints](#step-12-update-frontend-api-endpoints)
   - [Production Readiness Tips](#production-readiness-tips)
     - [Logging](#logging)
     - [Monitoring](#monitoring)
     - [Scaling](#scaling)
     - [Security](#security)
     - [Backup and Recovery](#backup-and-recovery)
     - [Code Optimization](#code-optimization)
   - [Additional Notes](#additional-notes)
   - [Conclusion](#conclusion)




# 1. CultureVo - AI Cultural Companion

## Overview
CultureVo is an AI application that provides users with culturally and emotionally intelligent AI companions. The platform bridges cultural gaps and offers personalized interactions through AI agents that understand local customs, traditions, and social nuances.

## Key Features

### 1. AI Agent Interactions
- Culturally-aware conversations with region-specific knowledge
- Emotional intelligence and empathetic responses
- Multi-personality AI agents with distinct characteristics

### 2. User Management
- Personalized user profiles and preferences
- Multi-step registration flow for targeted experience
- Secure authentication and session management

### 3. Chat Interface
- Real-time messaging with AI companions
- Voice input capabilities
- Markdown support for rich text formatting

## Technology Stack

### Frontend
- React.js for component-based UI
- React Router for navigation
- Context API for state management
- CSS3 for responsive design

### Backend
- Node.js/Express.js for API server
- JWT for authentication
- REST API architecture
- PostgreSQL database for data persistence

### Development Tools
- Git for version control
- npm for package management
- Environment configuration for deployment flexibility

## Target Audience
- Users seeking cultural understanding and companionship
- Language learners interested in cultural context
- People looking for emotionally intelligent conversations
- Those interested in exploring different cultural perspectives


# 2. Getting Started

## Prerequisites

Before starting, ensure you have:

1. **Required Software**
- Node.js v14 or higher
- PostgreSQL v12 or higher 
- Git
- npm (included with Node.js)

2. **Code Editor**
- Visual Studio Code (recommended)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd culturevo
```

### 2. Backend Setup (`chatbot-backend`)

```bash
cd chatbot-backend
npm install
```

Create a `.env` file with:
```env
# Server Configuration
PORT=5000
JWT_SECRET=your_jwt_secret_key

# Database Configuration
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=culturevo_db
```

### 3. Database Setup

In PostgreSQL:
```sql
CREATE DATABASE culturevo_db;
```

The schema will be automatically initialized through `db.js`.

### 4. Frontend Setup (`chatbot-frontend`)

```bash
cd ../chatbot-frontend
npm install
```

Create a `.env` file with:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Starting the Application

### 1. Start Backend Server
```bash
cd chatbot-backend
npm start
```
Server runs on http://localhost:5000

### 2. Start Frontend Development Server
```bash
cd chatbot-frontend
npm start
```
Frontend runs on http://localhost:3000

## Verification Steps

1. Backend Health Check:
- Visit http://localhost:5000
- Should see "Chatbot Backend is Running"

2. Frontend Access:
- Visit http://localhost:3000
- Should see the LandingPage

## Common Issues & Solutions

1. Database Connection:
- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database exists

2. Port Conflicts:
- If port 5000 is busy, modify PORT in backend `.env`
- If port 3000 is busy, React will prompt for alternate port

3. API Connection:
- Verify REACT_APP_API_URL matches backend port
- Check CORS configuration in `index.js`

For more details, refer to the component documentation in the codebase.


# 3. Architecture

## Overview

The CultureVo application follows a **Monolithic MVC (Model-View-Controller)** architecture. It consists of a unified codebase that separates concerns between the data layer, the server-side application logic, and the user interface. The frontend is built with **React.js**, providing a dynamic user interface, while the backend uses **Node.js** with **Express.js** for handling API requests, business logic, and database interactions with **PostgreSQL**.

## High-Level System Diagram

```mermaid
graph LR
    User -- UI Interactions --> Frontend
    Frontend -- API Calls (HTTP/HTTPS) --> Backend
    Backend -- Queries --> Database[(PostgreSQL)]
    Database -- Responses --> Backend
    Backend -- JSON Data --> Frontend
    Frontend -- Rendered Views --> User
```

## Directory Structure

### Backend ( chatbot-backend )

- **index.js**: Entry point of the backend server. Configures Express.js, middleware, and routes.
- **`controllers/`**: Contains the logic for handling requests and responses.
  - **`authController.js`**: Manages user authentication (registration and login).
  - **`userController.js`**: Handles user profile operations.
  - **agentController.js**: Manages AI agent creation and data retrieval.
- **`routes/`**: Defines application endpoints.
  - **authRoutes.js**: Routes for authentication-related actions (`/api/auth`).
  - **userRoutes.js**: Routes for user profile management (`/api/users`).
  - **agentRoutes.js**: Routes for AI agent operations (`/api/agents`).
- **`middleware/`**: Contains middleware functions.
  - **authMiddleware.js**: Verifies JWT tokens to secure protected routes.
- **`models/`**:
  - **`db.js`**: Sets up and exports the PostgreSQL database connection.

### Frontend ( chatbot-frontend )

- **`public/`**: Contains static files and the HTML template.
  - **index.html**: The main HTML file for the React application.
  - **`manifest.json`**: Web app manifest for Progressive Web App (PWA) configurations.
  - **`robots.txt`**: Instructions for web crawlers.
- **src/**: Main source code for the React application.
  - **index.js**: Entry point for rendering the React app.
  - **App.js**: Root component that defines routes and global structure.
  - **App.css**: Global CSS styles.
  - **`components/`**: Reusable React components (pages), each in its folder.
    - **Chats/**: Components for the chat interface between users and AI agents.
    - **Home/**: Components for the user dashboard displaying AI agents and announcements.
    - **`RegistrationFlow/`**: Multi-step registration process components (Page1.js, Page2.js, Page3.js).
    - **Profile/**: Components for user profile viewing and editing.
    - **NewAgent/**: Components for creating new AI agents.
    - **Other components**: Additional features like LandingPage, Login, Register, etc.
  - **`context/`**: Manages global state using React Context API.
  - **`services/`**: Contains functions and configurations for API calls.
    - **apiClient.js**: Sets up Axios instance for backend communication.
  - **`lib/`**: Utility functions and custom hooks shared across components.
  - **`constants.js`**: Defines application-wide constants, such as the app name.
  - **`useVoiceInput.js`**: Custom hook for handling voice input in chat.
  - **`images/`**: Contains image assets used in the application.
  - **index.css**: Global CSS resets and styles.
  - **reportWebVitals.js**: For measuring app performance.

## Interaction Between Frontend and Backend

The frontend and backend interact through RESTful API calls. The frontend sends HTTP requests to the backend, which processes the requests, interacts with the database if necessary, and returns responses.

### Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Frontend
    participant Backend
    participant Database

    User->>Browser: Interacts with UI
    Browser->>Frontend: Executes React app
    Frontend->>Backend: Sends API Request (e.g., GET /api/agents)
    Backend->>Middleware: Passes through authMiddleware
    Middleware->>Backend: Verifies JWT Token
    Backend->>Controller: Calls appropriate controller (e.g., agentController)
    Controller->>Database: Queries PostgreSQL
    Database-->>Controller: Returns data
    Controller-->>Backend: Processes data
    Backend-->>Frontend: Sends JSON Response
    Frontend-->>Browser: Updates UI with data
    Browser-->>User: Renders updated UI
```

### Interaction Steps

1. **User Action**: The user performs an action on the frontend (e.g., clicks "Submit" on a form).
2. **API Request**: The frontend component makes an HTTP request to the backend API endpoint using apiClient.js.
3. **Middleware Processing**: The request passes through authMiddleware.js to verify authentication.
4. **Controller Handling**: The relevant controller (e.g., agentController.js) processes the request.
5. **Database Interaction**: The controller interacts with the database via `db.js` to fetch or update data.
6. **Response Construction**: The controller formats the response data.
7. **API Response**: The backend sends a JSON response back to the frontend.
8. **UI Update**: The frontend updates the state and re-renders components to reflect new data.

## Summary

The CultureVo application employs a robust architecture that ensures clear separation of concerns:

- **Frontend (View)**: Built with React.js, it provides a responsive and interactive user interface. Components are modular and manage their own state or use global context when necessary.
- **Backend (Model & Controller)**: Developed using Express.js, it handles business logic, authentication and data persistence. Controllers manage the logic, while routes handle the endpoint definitions.
- **Database**: PostgreSQL is used for reliable and scalable data storage, managed through the `db.js` model.

This architecture allows for scalability, maintainability and ease of development, providing users with a seamless and efficient experience.


# 4. Backend Documentation

## Overview

The backend of the **CultureVo** application is responsible for handling all server-side operations, including:

- **User Authentication**: Registration, login and secure management of user sessions.
- **AI Agent Management**: Creation, retrieval and customization of AI companions.
- **Data Persistence**: Interacting with the PostgreSQL database to store and retrieve data.
- **API Services**: Providing RESTful API endpoints for the frontend to interact with.

Built with **Node.js** and **Express.js**, the backend follows a modular architecture, ensuring scalability, maintainability and security.

---

## Key Components

The backend is organized into the following key components:

### 1. **Controllers**

Controllers contain the business logic for the application. They handle incoming requests, process data and send responses.

- **authController.js**
  - **Purpose**: Manages user authentication processes.
  - **Responsibilities**:
    - Handle user registration by validating input, hashing passwords and storing user data.
    - Manage user login by verifying credentials and generating JWT tokens.

- **agentController.js**
  - **Purpose**: Manages operations related to AI agents.
  - **Responsibilities**:
    - Create new AI agents with specified attributes.
    - Retrieve existing agents associated with a user.
    - Fetch details of a specific agent.

- **userController.js**
  - **Purpose**: Handles user profile operations.
  - **Responsibilities**:
    - Retrieve user profile information.
    - Update user profile data.

### 2. **Middleware**

Middleware functions execute during the request-response cycle and are used for tasks like authentication and logging.

- **authMiddleware.js**
  - **Purpose**: Protects routes by verifying JWT tokens.
  - **Responsibilities**:
    - Extract and verify JWT tokens from request headers.
    - Allow access to protected routes only if the token is valid.

### 3. **Models**

Models handle data interactions with the database.

- **`db.js`**
  - **Purpose**: Sets up the database connection.
  - **Responsibilities**:
    - Configure and export a connection pool to the PostgreSQL database using environment variables.

### 4. **Routes**

Routes define the endpoints of the API and bind them to controller methods.

- **authRoutes.js**
  - **Purpose**: Defines endpoints for authentication-related operations.
  - **Endpoints**:
    - `POST /api/auth/register` - Register a new user.
    - `POST /api/auth/login` - Log in an existing user.

- **agentRoutes.js**
  - **Purpose**: Defines endpoints for AI agent management.
  - **Endpoints**:
    - `POST /api/agents` - Create a new agent.
    - `GET /api/agents` - Retrieve all agents for a user.
    - `GET /api/agents/:agent_id` - Retrieve a specific agent.

- **userRoutes.js**
  - **Purpose**: Defines endpoints for user profile operations.
  - **Endpoints**:
    - `GET /api/users/profile` - Retrieve the user's profile.

---

## Request Handling and Data Flow

### 1. **Handling Requests**

- **Express.js**: The server uses Express.js to handle HTTP requests and define routes.
- **Routing**: Routes are organized based on functionality (authentication, agent management, user profile).
- **Controllers**: Each route binds to a controller method that processes the request.

### 2. **Authentication Flow**

**Registration Process (`POST /api/auth/register`):**

1. **Receive Request**: User submits registration data (full name, username, email, password).
2. **Validate Input**: Ensure all required fields are present and email format is correct.
3. **Check for Duplicates**: Verify that the username or email doesn't already exist in the database.
4. **Hash Password**: Use bcrypt to securely hash the user's password.
5. **Generate User ID**: Create a unique user_id using UUID.
6. **Store User**: Save the new user's data in the database.
7. **Generate JWT Token**: Create a token containing user information.
8. **Send Response**: Return a success message along with the JWT token.

**Login Process (`POST /api/auth/login`):**

1. **Receive Request**: User submits login credentials (username/email and password).
2. **Validate Input**: Ensure credentials are provided.
3. **Retrieve User**: Fetch user data from the database using the provided username or email.
4. **Verify Password**: Compare the provided password with the stored hashed password using bcrypt.
5. **Update Login Timestamp**: Record the last login time for the user.
6. **Generate JWT Token**: Create a new token for the session.
7. **Send Response**: Return a success message and the JWT token.

### 3. **Authentication Middleware**

- **Purpose**: Protect routes by ensuring only authenticated users can access them.
- **Process**:
  1. **Extract Token**: Retrieve the token from the Authorization header (`Bearer Token` format).
  2. **Verify Token**: Use `jsonwebtoken` to verify the token against the secret key.
  3. **Attach User Info**: If valid, append the decoded user information to the req object.
  4. **Proceed**: Call next() to pass control to the next middleware or controller.
  5. **Handle Errors**: If invalid, send a `401 Unauthorized` response.

**Example Middleware Function:**

```javascript
// authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Check if the token is provided
  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Extract the token from the header
  const token = authHeader.split(' ')[1];

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Attach user information to the request object
    req.user = decoded;
    next();
  });
};
```

### 4. **Database Operations**

- **Database Connection**: Configured using `pg` library's connection pool.
- **Queries**: Use parameterized queries to prevent SQL injection.
- **User Data**: Stored in tables with appropriate fields and relationships.

**Example Database Configuration:**

```javascript
// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
```

### 5. **AI Agent Management**

- **Create Agent (`POST /api/agents`):**
  - **Process**:
    1. **Validate Input**: Ensure required agent details are provided.
    2. **Generate Agent ID**: Use UUID for a unique identifier.
    3. **Store Agent**: Insert agent data into the database linked to the user.
    4. **Send Response**: Return a success message and agent details.

- **Retrieve Agents (`GET /api/agents`):**
  - **Process**:
    1. **Fetch Agents**: Query the database for agents associated with the authenticated user.
    2. **Send Response**: Return the list of agents.

- **Retrieve Specific Agent (`GET /api/agents/:agent_id`):**
  - **Process**:
    1. **Validate Agent ID**: Ensure the agent belongs to the user.
    2. **Fetch Agent**: Retrieve agent details from the database.
    3. **Send Response**: Return the agent's information.

---

## Code Snippets for Important Functionalities

### 1. **User Registration with JWT**

```javascript
// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');
const { v4: uuidv4 } = require('uuid');

exports.register = async (req, res) => {
  const { full_name, username, email, password } = req.body;

  try {
    // Validate input fields
    if (!full_name || !username || !email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Check for existing user
    const userCheck = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique user ID
    const user_id = uuidv4();

    // Insert the new user into the database
    await pool.query(
      `INSERT INTO users (user_id, full_name, username, email, password_hash)
       VALUES ($1, $2, $3, $4, $5)`,
      [user_id, full_name, username, email, hashedPassword]
    );

    // Generate a JWT token
    const token = jwt.sign({ user_id, username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send success response with token
    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
```

### 2. **User Login and Token Generation**

```javascript
// authController.js
exports.login = async (req, res) => {
  const { username_or_email, password } = req.body;

  try {
    // Validate input
    if (!username_or_email || !password) {
      return res.status(400).json({ message: 'Please fill all required fields.' });
    }

    // Retrieve user by username or email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [username_or_email]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const user = userResult.rows[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Update last login timestamp
    await pool.query(
      'UPDATE users SET last_login = NOW() WHERE user_id = $1',
      [user.user_id]
    );

    // Generate JWT token
    const token = jwt.sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send success response with token
    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
```

### 3. **Protected Route Example**

```javascript
// agentRoutes.js
const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new agent (Protected Route)
router.post('/', authMiddleware.verifyToken, agentController.createAgent);

module.exports = router;
```

---

## Best Practices Implemented

### 1. **Modularity**

- **Separation of Concerns**: Controllers, routes, middleware, and models are separated into different directories/files.

### 2. **Security**

- **Password Hashing**: Passwords are hashed using bcrypt before storing them in the database.
- **JWT Authentication**: Tokens are used to authenticate users and protect routes.
- **Input Validation**: User inputs are validated to prevent injection attacks and ensure data integrity.
- **Parameterized Queries**: Database queries use parameterized statements to prevent SQL injection.
- **Environment Variables**: Sensitive information (e.g., database credentials, JWT secret) is stored in environment variables.

### 3. **Error Handling**

- **Try-Catch Blocks**: All asynchronous operations are wrapped in `try-catch` to handle exceptions.
- **Consistent Responses**: Error responses provide meaningful messages and appropriate HTTP status codes.
- **Logging**: Errors are logged to the console for debugging purposes.

### 4. **Performance**

- **Database Connection Pooling**: Utilizes connection pooling for efficient database access.
- **Asynchronous Operations**: Utilizes async/await for non-blocking I/O operations.

### 5. **Scalability**

- **RESTful API Design**: Follows REST principles, making it easy to scale and integrate with other services.
- **Modular Architecture**: Facilitates adding new features without impacting existing functionality.

---



# 5. Frontend Documentation

## Summary

The frontend of **CultureVo** is a React.js application that serves as the user interface for interacting with the AI companions. It provides a seamless and intuitive experience, allowing users to:

- Register and log in to their accounts.
- Complete a multi-step onboarding process.
- Create and customize AI agents.
- Engage in real-time conversations with AI agents.
- Manage their profiles and settings.
- Navigate through the application with a responsive design suitable for both desktop and mobile devices.

---

## Key Components and Their Responsibilities

The frontend codebase is organized into several key components and directories:

### 1. **Entry Point**

#### `src/App.js`

- **Role**: Serves as the root component and defines the routing structure of the application.
- **Responsibilities**:
  - Imports and integrates all major components.
  - Implements routing using React Router.
  - Manages public and protected routes.

---

### 2. **Components**

Located in `src/components/`, these are used as react pages.

#### **LandingPage**

- **Files**: `LandingPage.js`, `LandingPage.css`
- **Role**: Welcomes users and provides navigation to the registration or login pages.
- **Features**:
  - A brief introduction to CultureVo.
  - 'Get Started' and 'Login' buttons for user navigation.

#### **RegistrationFlow**

- **Files**:
  - `Page1.js`, `Page1.css`
  - `Page2.js`, `Page2.css`
  - `Page3.js`, `Page3.css`
- **Role**: Guides new users through a multi-step registration process.
- **Features**:
  - Collects user information such as username, date of birth and preferences.
  - Validates input fields and manages navigation between steps.
  - Utilizes context for state management across steps.

#### **Login**

- **Files**: `Login.js`, `Login.css`
- **Role**: Authenticates existing users.
- **Features**:
  - Collects username/email and password.
  - Handles form submission and error messages.
  - Stores JWT tokens in local storage upon successful login.

#### **Home**

- **Files**: `Home.js`, `Home.css`
- **Role**: Serves as the main dashboard for users after logging in.
- **Features**:
  - Displays a list of the user's AI agents.
  - Provides navigation to create new agents or access chats.
  - Includes a footer navigation bar for easy access to main sections.

#### **Chats**

- **Files**: `Chats.js`, `Chats.css`
- **Role**: Provides the chat interface for interacting with AI agents.
- **Features**:
  - Real-time messaging with AI agents.
  - Supports markdown rendering and typewriter effects for assistant messages.
  - Includes sidebar navigation and dynamic content panels (e.g., calls, gallery).
  - Responsive design for both mobile and desktop views.

#### **Profile**

- **Files**: `Profile.js`, `Profile.css`
- **Role**: Allows users to manage their profile settings and account preferences.
- **Features**:
  - Edit personal information and preferences.
  - Navigate through different profile sections using a sidebar.
  - Access to account settings, agent information, credits, help and logout options.

#### **NewAgent**

- **Files**: `NewAgent.js`, `NewAgent.css`
- **Role**: Enables users to create and customize new AI agents.
- **Features**:
  - Collects agent details such as name, traits and preferences.
  - Validates input and submits agent data to the backend.

---

### 3. **State Management**

#### `src/context/DataContext.js`

- **Role**: Provides a global state management solution using React's Context API.
- **Responsibilities**:
  - Stores and shares user data across components.
  - Manages state for the registration flow and user authentication.
- **Usage**:
  - Wraps the App component with DataProvider in `src/index.js`.

---

### 4. **Routing**

- **Implementation**: Utilizes **React Router** for client-side routing.
- **Setup**:
  - Defined in `src/App.js`.
  - Uses Routes and Route components to map paths to components.
- **Example**:

  ```jsx
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

  const App = () => {
    return (
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Registration Flow */}
          <Route path="/registration/page1" element={<Page1 />} />
          <Route path="/registration/page2" element={<Page2 />} />
          <Route path="/registration/page3" element={<Page3 />} />

          {/* Protected Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/chats/:agent_id?" element={<Chats />} />
          <Route path="/new" element={<NewAgent />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    );
  };
  ```

---

### 5. **Styling**

- **Approach**: Uses traditional CSS stylesheets for styling components.
- **Structure**:
  - Each component has its own CSS file (e.g., Home.css, Chats.css).
  - Global styles are defined in `src/App.css` and `src/index.css`.
- **Responsive Design**:
  - Utilizes Flexbox and media queries for responsiveness.
  - Mobile-friendly navigation and layouts.
- **Fonts and Icons**:
  - Imports fonts like 'Urbanist' for typography.
  - Uses Font Awesome for icons (imported in index.js).

---

### 6. **API Services**

#### `src/services/apiClient.js`

- **Role**: Sets up Axios instance for HTTP requests to the backend API.
- **Responsibilities**:
  - Configures the base URL from environment variables.
  - Includes request interceptors to attach JWT tokens from local storage.
- **Usage**:

  ```javascript
  import axios from 'axios';

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  // Add a request interceptor
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  export default apiClient;
  ```

---

### 7. **Utilities and Hooks**

- **Constants**: Defines application-wide constants in `constants.js`.
- **Lib**: Contains library functions and utilities in `src/lib/`.

---

## Example Snippets

### **1. Implementing Navigation with React Router**

In `src/App.js`:

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Chats from './components/Chats/Chats';
import Profile from './components/Profile/Profile';

// ...

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ...other routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/chats/:agent_id?" element={<Chats />} />
        <Route path="/profile" element={<Profile />} />
        {/* ...other routes */}
      </Routes>
    </Router>
  );
};

export default App;
```

### **2. Using Context for State Management**

In `src/context/DataContext.js`:

```javascript
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  // Other global states can be added here

  return (
    <DataContext.Provider value={{ userData, setUserData }}>
      {children}
    </DataContext.Provider>
  );
};
```

Wrapping the App component in `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { DataProvider } from './context/DataContext';

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

### **3. Making API Calls with Axios**

In a component like `Login.js`:

```javascript
import apiClient from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';

// ...

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username_or_email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/login', credentials);
      localStorage.setItem('token', response.data.token);
      navigate('/home');
    } catch (error) {
      // Handle login error
    }
  };

  // ...
};
```

### **4. Styling Components with CSS**

In `Home.css`:

```css
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.home-container h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.agent-list {
  display: flex;
  flex-direction: column;
}

.agent-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.agent-item img {
  border-radius: 50%;
  margin-right: 15px;
}

.agent-item .agent-details {
  flex-grow: 1;
}
```

In `Home.js`:

```jsx
import React from 'react';
import './Home.css';

const Home = () => {
  const agents = []; // Assume agents data is fetched from API

  return (
    <div className="home-container">
      <h1>Your AI Agents</h1>
      <div className="agent-list">
        {agents.map((agent) => (
          <div key={agent.id} className="agent-item">
            <img src={agent.avatar} alt={`${agent.name}'s avatar`} />
            <div className="agent-details">
              <h2>{agent.name}</h2>
              <p>{agent.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
```

### **5. Responsive Sidebar in Chats**

In `Chats.js`:

```jsx
import React, { useState } from 'react';
import './Chats.css';

const Chats = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`chats-page ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <nav>
          {/* Navigation links */}
          <a href="/home">Home</a>
          <a href="/chats">Chats</a>
          <a href="/profile">Profile</a>
        </nav>
      </div>
      <div className="chat-container">
        {/* Chat messages and input */}
      </div>
    </div>
  );
};

export default Chats;
```

In `Chats.css`:

```css
.chats-page {
  display: flex;
}

.sidebar {
  width: 250px;
  transition: transform 0.3s ease;
}

.sidebar .menu-toggle {
  display: none;
}

.chat-container {
  flex-grow: 1;
  padding: 20px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    transform: translateX(-250px);
  }

  .sidebar-open .sidebar {
    transform: translateX(0);
  }

  .sidebar .menu-toggle {
    display: block;
  }
}
```


**Note**: For more detailed information, refer to the inline comments within the codebase and the specific component documentation.




# 6. Database Documentation

## Overview

The **CultureVo** application utilizes a PostgreSQL relational database to store and manage data essential for its operation. The database plays a critical role in:

- **User Management**: Storing user credentials, profiles and preferences.
- **AI Agent Management**: Recording details of AI agents created by users, including their attributes and relationships.
- **Chat Interactions**: (Assumed for future implementation) Logging conversations between users and AI agents for personalization and continuity.

The database schema is designed to ensure data integrity, efficient querying and scalability as the application grows.

---

## Database Schema

The database consists of the following primary tables:

1. **`users`**
2. **`agents`**

### Entity-Relationship Diagram

```mermaid
erDiagram
    USERS ||--o{ AGENTS : "creates"
    
    USERS {
        uuid user_id PK
        varchar full_name
        varchar username
        varchar email
        varchar password_hash
        date date_of_birth
        varchar gender
        boolean is_active
        timestamp registration_date
        timestamp last_login
        timestamp updated_at
        boolean dark_mode_pref
    }
    
    AGENTS {
        uuid agent_id PK
        uuid user_id FK
        varchar agent_name
        varchar agent_gender
        varchar relationship_status
        text personality_traits
        text interests
        timestamp created_at
        timestamp updated_at
    }
```

### Table Descriptions

#### 1. `users`

Stores information about the users of the application.

- **Columns**:
  - user_id (UUID, Primary Key): Unique identifier for each user.
  - full_name (VARCHAR): User's full name.
  -  (VARCHAR, Unique): Username chosen by the user.
  - email (VARCHAR, Unique): User's email address.
  - `password_hash` (VARCHAR): Hashed password for authentication.
  - date_of_birth (DATE): User's birth date.
  - gender (VARCHAR): User's gender.
  - `is_active` (BOOLEAN): Indicates if the user's account is active.
  - `registration_date` (TIMESTAMP): Date and time the user registered.
  - `last_login` (TIMESTAMP): Last login date and time.
  - `updated_at` (TIMESTAMP): Last profile update timestamp.
  - `dark_mode_pref` (BOOLEAN): User's preference for dark mode UI.

- **Constraints**:
  - `PRIMARY KEY (user_id)`
  - `UNIQUE (username)`
  - `UNIQUE (email)`

#### 2. `agents`

Stores AI agent information created by users.

- **Columns**:
  - `agent_id` (UUID, Primary Key): Unique identifier for each agent.
  -  (UUID, Foreign Key): References `users.user_id`.
  - `agent_name` (VARCHAR): Name of the AI agent.
  - `agent_gender` (VARCHAR): Gender of the AI agent.
  - `relationship_status` (VARCHAR): Type of relationship (e.g., Friendship, Mentor, Romantic).
  - `personality_traits` (TEXT): JSON or comma-separated list of traits.
  - `interests` (TEXT): JSON or comma-separated list of interests.
  - `created_at` (TIMESTAMP): Agent creation timestamp.
  - `updated_at` (TIMESTAMP): Last update timestamp.

- **Constraints**:
  - `PRIMARY KEY (agent_id)`
  - `FOREIGN KEY (user_id)` references `users(user_id)` on delete cascade.

---

## Key Queries and Operations

### 1. User Registration

**Purpose**: Insert a new user into the `users` table during registration.

**Query**:

```sql
INSERT INTO users (
  user_id,
  full_name,
  username,
  email,
  password_hash,
  date_of_birth,
  gender,
  registration_date,
  updated_at
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
);
```

**Parameters**:

- `$1`: user_id (generated UUID)
- `$2`: full_name
- `$3`: username
- `$4`: email
- `$5`: `password_hash` (hashed password)
- `$6`: date_of_birth
- `$7`: gender


### 2. User Login

**Purpose**: Retrieve user credentials for authentication.

**Query**:

```sql
SELECT * FROM users WHERE username = $1 OR email = $1;
```

**Parameters**:

- `$1`: `username_or_email`

### 3. Update Last Login

**Purpose**: Update the `last_login` timestamp after a successful login.

**Query**:

```sql
UPDATE users SET last_login = NOW() WHERE user_id = $1;
```

**Parameters**:

- `$1`: user_id


### 4. Create AI Agent

**Purpose**: Insert a new agent into the `agents` table.

**Query**:

```sql
INSERT INTO agents (
  agent_id,
  user_id,
  agent_name,
  agent_gender,
  relationship_status,
  personality_traits,
  interests,
  created_at,
  updated_at
) VALUES (
  $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
);
```

**Parameters**:

- `$1`: `agent_id` (generated UUID)
- `$2`: `user_id`
- `$3`: `agent_name`
- `$4`: `agent_gender`
- `$5`: `relationship_status`
- `$6`: `personality_traits`
- `$7`: `interests`

### 5. Retrieve User's Agents

**Purpose**: Fetch all agents created by a specific user.

**Query**:

```sql
SELECT * FROM agents WHERE user_id = $1;
```

**Parameters**:

- `$1`: user_id

---

## Examples of Database Interactions

### 1. Registering a New User

**Backend Code Snippet** (`authController.js`):

```javascript
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('../models/db');

exports.register = async (req, res) => {
  const { full_name, username, email, password, date_of_birth, gender } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate unique user ID
    const user_id = uuidv4();
    // Insert user into database
    await pool.query(
      `INSERT INTO users (
        user_id, full_name, username, email, password_hash, date_of_birth, gender, registration_date, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
      )`,
      [user_id, full_name, username, email, hashedPassword, date_of_birth, gender]
    );
    // Respond with success
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
```

### 2. Creating an AI Agent

**Backend Code Snippet** (`agentController.js`):

```javascript
exports.createAgent = async (req, res) => {
  const { user_id } = req.user; // Extracted from JWT token
  const { agent_name, agent_gender, relationship_status, personality_traits, interests } = req.body;
  try {
    const agent_id = uuidv4();
    await pool.query(
      `INSERT INTO agents (
        agent_id, user_id, agent_name, agent_gender, relationship_status, personality_traits, interests, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, NOW(), NOW()
      )`,
      [agent_id, user_id, agent_name, agent_gender, relationship_status, personality_traits, interests]
    );
    res.status(201).json({ message: 'Agent created successfully.', agent_id });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
```

### 3. Retrieving User Profile

**Backend Code Snippet** (`userController.js`):

```javascript
exports.getProfile = async (req, res) => {
  const { user_id } = req.user;
  try {
    const userResult = await pool.query(
      `SELECT user_id, full_name, username, email, date_of_birth, gender, dark_mode_pref, is_active, registration_date, last_login, updated_at 
       FROM users WHERE user_id = $1`,
      [user_id]
    );
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user = userResult.rows[0];
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
```

---

## Best Practices for Database Management

### 1. **Use Parameterized Queries**

All database queries use parameterized statements (`$1`, `$2`, etc.) to prevent SQL injection attacks.

**Example**:

```javascript
pool.query('SELECT * FROM users WHERE username = $1', [username]);
```

### 2. **Connection Pooling**

The database connection is managed using a pool to optimize resource utilization and improve performance.

**Configuration** (`db.js`):

```javascript
const { Pool } = require('pg');
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
module.exports = pool;
```

### 3. **Error Handling**

All database operations are wrapped in `try-catch` blocks to handle exceptions gracefully and provide meaningful error messages to the client.

### 4. **Data Validation**

Inputs are validated before performing database operations to ensure data integrity and prevent malformed data from entering the database.

### 5. **Secure Password Storage**

Passwords are hashed using bcrypt with a sufficient number of salt rounds before storing them in the database.

**Example**:

```javascript
const hashedPassword = await bcrypt.hash(password, 10);
```

### 6. **UUIDs for Primary Keys**

Uses UUIDs for primary keys to ensure uniqueness across distributed systems and enhance security by avoiding sequential IDs.

### 7. **Indexing**

Appropriate indexes have be added to columns that are frequently searched or used in JOIN operations (e.g., username, email, user_id in `agents`).

### 9. **Foreign Key Constraints**

Defines foreign key relationships to ensure referential integrity between tables.

**Example**:

```sql
ALTER TABLE agents
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES users(user_id)
ON DELETE CASCADE;
```

### 10. **Database Normalization**

The schema is designed to reduce data redundancy by following normalization principles, splitting data into related tables.

---

## Additional Considerations

### 1. **Scaling**

As the application grows, consider implementing database sharding or replication strategies to handle increased load.

### 2. **Caching**

Implement caching mechanisms (e.g., Redis) for frequently accessed data to improve performance.

### 3. **Data Backup and Recovery**

Regular backups should be scheduled to prevent data loss and recovery procedures should be tested periodically.

### 4. **Monitoring and Alerting**

Set up monitoring tools to track database performance metrics and configure alerts for any anomalies.

### 5. **Use of ORMs**

Using an Object-Relational Mapping (ORM) tool like Sequelize can simplify database interactions and migrations.

---


# 7. API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the request header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### 1. User Registration
Create a new user account.

**URL**: `/auth/register`  
**Method**: `POST`  
**Auth Required**: No

**Request Body**:
```json
{
  "full_name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123",
  "date_of_birth": "1990-01-01",
  "gender": "Male"
}
```

**Success Response**:  
Code: `201 CREATED`
```json
{
  "message": "User registered successfully.",
  "token": "<jwt_token>"
}
```

**Error Responses**:
- `400 BAD REQUEST`: Missing required fields or invalid input
- `409 CONFLICT`: Username/email already exists
- `500 SERVER ERROR`: Internal server error

### 2. User Login
Authenticate existing user.

**URL**: `/auth/login`  
**Method**: `POST`  
**Auth Required**: No

**Request Body**:
```json
{
  "username_or_email": "johndoe",
  "password": "securepassword123"
}
```

**Success Response**:  
Code: `200 OK`
```json
{
  "message": "Login successful.",
  "token": "<jwt_token>"
}
```

**Error Responses**:
- `400 BAD REQUEST`: Invalid credentials
- `500 SERVER ERROR`: Internal server error

### 3. Create AI Agent
Create a new AI companion.

**URL**: `/agents`  
**Method**: `POST`  
**Auth Required**: Yes

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Request Body**:
```json
{
  "name": "Alex",
  "gender": "Female",
  "relationship_status": "Friend",
  "personality_traits": ["Friendly", "Empathetic"],
  "interests": ["Reading", "Travel"],
  "image_url": "https://example.com/image.jpg",
  "city": "Delhi"
}
```

**Success Response**:  
Code: `201 CREATED`
```json
{
  "message": "AI agent created successfully.",
  "agent_id": "<uuid>"
}
```

**Error Responses**:
- `400 BAD REQUEST`: Missing required fields
- `401 UNAUTHORIZED`: Invalid/missing token
- `500 SERVER ERROR`: Internal server error

### 4. Get User's Agents
Retrieve all AI agents for authenticated user.

**URL**: `/agents`  
**Method**: `GET`  
**Auth Required**: Yes

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response**:  
Code: `200 OK`
```json
{
  "agents": [
    {
      "agent_id": "<uuid>",
      "name": "Alex",
      "gender": "Female",
      "relationship_status": "Friend",
      "personality_traits": ["Friendly", "Empathetic"],
      "interests": ["Reading", "Travel"],
      "image_url": "https://example.com/image.jpg",
      "city": "Delhi",
      "creation_date": "2024-01-20T10:30:00Z"
    }
  ]
}
```

**Error Responses**:
- `401 UNAUTHORIZED`: Invalid/missing token
- `500 SERVER ERROR`: Internal server error

### 5. Get Specific Agent
Retrieve details of a specific AI agent.

**URL**: `/agents/:agent_id`  
**Method**: `GET`  
**Auth Required**: Yes

**URL Parameters**:
- 

agent_id: UUID of the agent

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response**:  
Code: `200 OK`
```json
{
  "agent": {
    "agent_id": "<uuid>",
    "name": "Alex",
    "gender": "Female",
    "relationship_status": "Friend",
    "personality_traits": ["Friendly", "Empathetic"],
    "interests": ["Reading", "Travel"],
    "image_url": "https://example.com/image.jpg",
    "city": "Delhi",
    "creation_date": "2024-01-20T10:30:00Z"
  }
}
```

**Error Responses**:
- `401 UNAUTHORIZED`: Invalid/missing token
- `404 NOT FOUND`: Agent not found
- `500 SERVER ERROR`: Internal server error

### 6. Get User Profile
Retrieve authenticated user's profile information.

**URL**: `/users/profile`  
**Method**: `GET`  
**Auth Required**: Yes

**Request Headers**:
```
Authorization: Bearer <jwt_token>
```

**Success Response**:  
Code: `200 OK`
```json
{
  "user": {
    "user_id": "<uuid>",
    "full_name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "date_of_birth": "1990-01-01",
    "gender": "Male",
    "dark_mode_pref": false,
    "registration_date": "2024-01-01T00:00:00Z",
    "last_login": "2024-01-20T10:30:00Z"
  }
}
```

**Error Responses**:
- `401 UNAUTHORIZED`: Invalid/missing token
- `404 NOT FOUND`: User not found
- `500 SERVER ERROR`: Internal server error

## Error Format
All error responses follow this format:
```json
{
  "message": "Error description"
}
```

## Authentication Format
JWT tokens must be included in the Authorization header:
```
Authorization: Bearer exQhbXcfWiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Notes
- All timestamps are in ISO 8601 format
- UUIDs are used for all IDs
- Responses may include additional fields not documented here
- Token expiration: 1 hour from issuance
- Rate limiting may be applied to prevent abuse



# 8. Deployment Documentation
## Overview

This guide provides step-by-step instructions to deploy the **Chatbot Application** on an AWS EC2 instance. It covers environment configurations, application setup, database installation and tips for ensuring production readiness, including logging, monitoring and scaling.

---

## Environment Configuration

### Backend Configuration (`.env` file)

Create a `.env` file in your 

chatbot-backend

 directory with the following content:

```env
# Server Configuration
NODE_ENV=production
PORT=5000
JWT_SECRET=your_jwt_secret_key  # Replace with a strong secret key

# Database Configuration
DB_USER=your_db_user           # Replace with PostgreSQL username
DB_PASS=your_db_password       # Replace with PostgreSQL password
DB_NAME=your_db_name           # Replace with PostgreSQL database name
DB_HOST=localhost
DB_PORT=5432

```

### Frontend Configuration (`.env` file)

Create a `.env` file in your 

chatbot-frontend

 directory with the following content:

```env
REACT_APP_API_URL=http://<your-ec2-public-ip>:5000/api
```

*Replace `<your-ec2-public-ip>` with your EC2 instance's public IP address.*

---

## Deployment Instructions

### Step 1: Launch an EC2 Instance

1. **Login to AWS Console**: Navigate to the EC2 dashboard.
2. **Launch Instance**:
   - Choose **Ubuntu Server 20.04 LTS** as the Amazon Machine Image (AMI).
   - Select an instance type (e.g., **t2.medium** for testing).
3. **Configure Instance Details**:
   - Configure network settings as per your requirements.
4. **Add Storage**: Accept default settings or adjust as needed.
5. **Add Tags**: (Optional) Add tags for identification.
6. **Configure Security Group**:
   - Add rules to allow inbound traffic on necessary ports:
     - **SSH (22)**: For SSH access.
     - **HTTP (80)**: If using Nginx or Apache later.
     - **Custom TCP (3000)**: For frontend.
     - **Custom TCP (5000)**: For backend API.
7. **Review and Launch**:
   - Select an existing key pair or create a new one.
   - Launch the instance.

### Step 2: Connect to Your EC2 Instance

Use your terminal to SSH into the EC2 instance:

```bash
ssh -i /path/to/your-key-pair.pem ubuntu@<your-ec2-public-ip>
```

*Ensure your `.pem` file has appropriate permissions:*

```bash
chmod 400 /path/to/your-key-pair.pem
```

### Step 3: Update System Packages

```bash
sudo apt-get update && sudo apt-get upgrade -y
```

### Step 4: Install Node.js and npm

```bash
# Install Node.js (version 16.x)
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installations
node -v
npm -v
```

### Step 5: Install PostgreSQL

```bash
# Install PostgreSQL and contrib packages
sudo apt-get install -y postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Step 6: Configure PostgreSQL

1. **Switch to postgres user**:

   ```bash
   sudo -i -u postgres
   ```

2. **Access PostgreSQL shell**:

   ```bash
   psql
   ```

3. **Create Database and User**:

   ```sql
   CREATE DATABASE your_db_name;
   CREATE USER your_db_user WITH PASSWORD 'your_db_password';
   GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;
   ```

4. **Exit PostgreSQL shell**:

   ```sql
   \q
   ```

5. **Return to ubuntu user**:

   ```bash
   exit
   ```

### Step 7: Clone Your Project Repository

```bash
# Navigate to home directory
cd ~

# Clone the repository (replace with your repository URL)
git clone https://github.com/your-username/your-repo.git aiagents
```

### Step 8: Deploy the Backend

1. **Navigate to Backend Directory**:

   ```bash
   cd ~/aiagents/chatbot-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file and add your production configurations as shown in the **Backend Configuration** section.

4. **Update Database Configuration**:

   Ensure your 

db.js

 uses environment variables:

   ```javascript
   // models/db.js

   const { Pool } = require("pg");
   require("dotenv").config();

   const pool = new Pool({
     user: process.env.DB_USER,
     host: process.env.DB_HOST,
     database: process.env.DB_NAME,
     password: process.env.DB_PASS,
     port: process.env.DB_PORT,
   });

   module.exports = pool;
   ```

5. **Start the Backend Server**:

   ```bash
   node index.js
   ```

   *The backend should now be running on `http://<your-ec2-public-ip>:5000`.*

### Step 9: Deploy the Frontend

1. **Navigate to Frontend Directory**:

   ```bash
   cd ~/aiagents/chatbot-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   - Create a `.env` file and add your production configurations as shown in the **Frontend Configuration** section.

4. **Build the React Application**:

   ```bash
   npm run build
   ```

5. **Serve the Frontend**:

   ```bash
   sudo npm install -g serve
   serve -s build -l 3000
   ```

   *The frontend should now be accessible at `http://<your-ec2-public-ip>:3000`.*

### Step 10: Automate Processes with PM2

1. **Install PM2 Globally**:

   ```bash
   sudo npm install -g pm2
   ```

2. **Start Backend with PM2**:

   ```bash
   pm2 start index.js --name chatbot-backend
   ```

3. **Start Frontend with PM2**:

   ```bash
   pm2 start "serve -s build -l 3000" --name chatbot-frontend
   ```

4. **Save PM2 Processes**:

   ```bash
   pm2 save
   ```

5. **Enable PM2 Startup Script**:

   ```bash
   pm2 startup
   ```

   - Follow the instructions output by the command to enable PM2 on system startup.

6. **Check PM2 Status**:

   ```bash
   pm2 status
   ```

### Step 11: Configure Security and Firewall

1. **Enable UFW Firewall**:

   ```bash
   sudo ufw allow OpenSSH
   sudo ufw allow 3000    # Frontend port
   sudo ufw allow 5000    # Backend port
   sudo ufw enable
   ```

2. **Confirm Firewall Status**:

   ```bash
   sudo ufw status
   ```

### Step 12: Update Frontend API Endpoints

Ensure that API calls in your frontend point to the correct backend URL, which should be `http://<your-ec2-public-ip>:5000/api`.

---

## Production Readiness Tips

### Logging

- **Implement Logging Libraries**:

  Use logging libraries like `winston` or `morgan` in your backend to capture detailed logs.

- **PM2 Log Management**:

  PM2 handles logs for your applications.

  ```bash
  pm2 logs chatbot-backend
  pm2 logs chatbot-frontend
  ```

### Monitoring

- **Use PM2 Monitoring Tools**:

  ```bash
  pm2 monit
  ```

- **Consider External Monitoring**:

  Integrate tools like **AWS CloudWatch**, **New Relic** or **Datadog** for advanced monitoring.

### Scaling

- **Vertical Scaling**:

  Upgrade your EC2 instance type (e.g., from `t2.micro` to `t2.medium`) to get more compute resources.

- **Horizontal Scaling**:

  - Use **Load Balancers** to distribute traffic.

  - Consider containerization with **Docker** and orchestration with **Kubernetes** or **AWS ECS**.

### Security

- **Environment Variables**:

  Keep your `.env` files secure and never commit them to version control.

- **SSH Keys**:

  Protect your SSH keys and use key pairs instead of passwords.

- **Regular Updates**:

  Keep your system and dependencies updated to patch security vulnerabilities.

- **HTTPS**:

  For production, secure your application with SSL certificates using **Let's Encrypt** or **AWS Certificate Manager**.

### Backup and Recovery

- **Database Backups**:

  Schedule regular backups of your PostgreSQL database.

- **Snapshot EC2 Instances**:

  Regularly create snapshots of your EC2 instance for recovery purposes.

### Code Optimization

- **Minify Assets**:

  Ensure your frontend build minifies CSS and JS assets.

- **Tree Shaking**:

  Remove unused code during the build process.

- **Lazy Loading**:

  Implement lazy loading for components to improve performance.

---

## Additional Notes

- **Domain Setup**: If you have a domain, point it to your EC2 instance's IP address.

- **SSL Termination**: Configure Nginx or use AWS services to handle SSL termination.

- **Load Testing**: Perform load testing using tools like **Apache JMeter** or **Locust** to ensure your application can handle expected traffic.

- **Error Handling**: Implement comprehensive error handling and fallback mechanisms in your application.

---

## Conclusion

By following this guide, you will have a production-ready deployment of your Chatbot Application on AWS EC2. Remember to regularly monitor your application, keep dependencies updated and apply best practices for security and performance.
