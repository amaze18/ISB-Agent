# Main components and their purposes in the chatbot-frontend #

### Core Components

1. `App.js`
      - Main application component
      - Handles routing using React Router
      - Defines protected and public routes

2. `LandingPage`
      - Welcome screen for new users
      - Provides links to Register and Login
      - Displays initial CultureVo introduction

4. `Home`
      - Main dashboard after login
      - Displays AI agent list
      - Shows announcements and updates
      - Navigation hub to other features

### Authentication Components

4. `Login`
      - Handles user authentication
      - Login form with credentials

5. `Register`
      - Initial user registration
      - Collects basic user information

### Registration Flow Components

6. `RegistrationFlow/Page1`
      - Collects username, DOB, gender
      - First step of multi-step registration

7. `RegistrationFlow/Page2`
      - AI relationship type selection
      - AI gender preference
      - Second step of registration

8. `RegistrationFlow/Page3`
      - AI personality customization
      - Interests and traits selection
      - Final registration step

### Core Features

9. `Chats`
      - Main chat interface
      - Real-time messaging with AI
      - Message history display

10. `NewAgent`
      - Creates new AI companions
      - Customization options
      - Agent personality setup

11. `Profile`
      - User profile management
      - Settings and preferences
      - Account management

### Support Components

12. `DataContext`
      - Global state management
      - Shares data across components
      - Manages user and AI agent data

13. `TypewriterMarkdown`
      - Renders markdown with typing effect
      - Used in chat messages

Each component follows a modular structure with its own CSS and functionality, creating a cohesive user experience for the chatbot application.
