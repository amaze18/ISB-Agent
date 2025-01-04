# Main components and their purposes in the chatbot-Backend #

1. `controllers/`
   - `authController.js`: Handles user authentication
     - User registration with password hashing
     - Login with JWT token generation
     - Email validation
     - Error handling

   - `agentController.js`: Manages AI agents
     - Creates new AI agents
     - Retrieves agent details
     - Handles agent customization
     - Links agents to users

   - `userController.js`: User profile management
     - Gets user profile data
     - Updates user information

2. `middleware/`
   - `authMiddleware.js`: Authentication middleware
     - Verifies JWT tokens
     - Protects routes
     - Handles unauthorized access

3. `models/`
   - `db.js`: Database configuration
     - PostgreSQL connection pool setup
     - Environment variable configuration
     - Database connection management

4. `routes/`
   - `authRoutes.js`: Authentication endpoints
     - POST /auth/register for registration
     - POST /auth/login for login

   - `agentRoutes.js`: AI agent endpoints
     - POST /agents to create agent
     - GET /agents to list agents
     - GET /agents/:id for specific agent

   - `userRoutes.js`: User profile endpoints
     - GET /profile for user data
     - Protected routes requiring authentication

5. `index.js`: Main application file
   - Express server setup
   - Middleware configuration (CORS, body-parser)
   - Route mounting
   - Server initialization
   - Environment configuration

The backend follows a typical Express.js MVC architecture with:
- Clear separation of concerns
- Modular routing
- Middleware for cross-cutting concerns
- Secure authentication flow
- Database abstraction
