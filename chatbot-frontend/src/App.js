/**
 * Main Application Component
 * Handles routing and overall application structure
 * Uses React Router v6 for navigation management
 */

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Application-wide styles
import "./App.css";

// Component imports
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import NewAgent from "./components/NewAgent/NewAgent";
import Chats from "./components/Chats/Chats";
import Profile from "./components/Profile/Profile";
import Page1 from "./components/RegistrationFlow/Page1";
import Page2 from "./components/RegistrationFlow/Page2";
import Page3 from "./components/RegistrationFlow/Page3";
import AboutUs from "./components/About/AboutUs";
import Features from "./components/Features/Features";
import PrivacyPolicy from "./components/Policies/PrivacyPolicy";
import TermsOfService from "./components/Policies/TermsOfService";

/**
 * App Component
 * Root component that defines the application's routing structure
 *
 * Routing Structure:
 * - Public Routes: Accessible without authentication
 *   - Landing Page (/)
 *   - Register (/register)
 *   - Login (/login)
 *
 * - Registration Flow Routes: Multi-step registration process
 *   - Page1 (/registration/page1)
 *   - Page2 (/registration/page2)
 *   - Page3 (/registration/page3)
 *
 * - Protected Routes: Require authentication
 *   - Home Dashboard (/home)
 *   - Chat Interface (/chats and /chats/:agent_id?)
 *   - New Agent Creation (/new)
 *   - User Profile (/profile)
 */
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />

        {/* Authentication Routes - Remove the constraining wrapper */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Registration Flow Pages */}
        {[
          "/registration/page1",
          "/registration/page2",
          "/registration/page3",
        ].map((path, index) => (
          <Route
            key={path}
            path={path}
            element={React.createElement([Page1, Page2, Page3][index])}
          />
        ))}

        {/* Protected Routes */}
        {[
          { path: "/home", Component: Home },
          { path: "/chats/:agent_id?", Component: Chats },
          { path: "/new", Component: NewAgent },
          { path: "/profile", Component: Profile },
        ].map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
  );
};

// TODO: Consider implementing:
// - Authentication guard for protected routes
// - Loading states for route transitions
// - Error boundaries for route components
// - 404 page for undefined routes

export default App;
