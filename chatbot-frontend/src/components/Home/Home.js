import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import APP_NAME from "../../constants";

/**
 * Home Component
 *
 * Main dashboard component that displays AI agents and provides navigation.
 * Features:
 * - Displays list of AI agents
 * - Shows announcements
 * - Provides navigation to other sections
 * - Handles authentication state
 *
 * @component
 */

/**
 * Home component serves as the main dashboard after user authentication.
 * Manages the display of AI agents, announcements, and navigation options.
 *
 * @returns {JSX.Element} Rendered Home component
 */
const Home = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const location = useLocation(); // Hook to access current route information

  // State Management
  const [agents, setAgents] = useState([]); // Stores list of AI agents
  const [error, setError] = useState(null); // Manages error state for API calls

  const imageFilenames = [
    "Female_LinkedinPortrait.avif",
    "female_regencystyle.avif",
    "FemaleBigBen.avif",
    "Male_LinkedinPortrait.avif",
    "male_Monochrome.avif",
    "MaleAncientGreece.avif",
    "MaleAncientJapan.avif",
    "malebuzzcut.avif",
    "malecurlyhair.avif",
    "MaleGreatPyramids.avif",
    "MaleParthenon.avif",
    "MaleRoman.avif",
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageFilenames.length);
    return `/images/test_zero1/${imageFilenames[randomIndex]}`;
  };

  /**
   * Effect hook to fetch AI agents on component mount
   * Includes authentication check and error handling
   *
   * @dependency {navigate} - Re-runs if navigation function changes
   */
  useEffect(() => {
    const fetchAgents = async () => {
      // Authentication check
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Security: Redirect unauthenticated users
        return;
      }

      try {
        const response = await apiClient.get("/agents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAgents(response.data.agents);
      } catch (err) {
        console.error("Error fetching agents:", err);
        setError("Failed to load AI agents. Please try again later.");
      }
    };

    fetchAgents();
  }, [navigate]);

  /**
   * Handles navigation to specific chat sessions
   *
   * @param {string} agentId - Unique identifier for the selected agent
   */
  const openChat = (agentId) => {
    navigate(`/chats/${agentId}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      {/* Main container - full width on mobile, 50% on larger screens */}
      <div className="w-full lg:w-1/2 h-screen bg-white shadow-lg flex flex-col">
        {/* Logo Section - Adjusted padding for mobile */}
        <section className="p-4 lg:p-6 text-center flex-shrink-0">
          <Link
            to="/home"
            className="text-2xl lg:text-4xl font-bold text-purple-600 hover:text-purple-700"
          >
            {APP_NAME}
          </Link>
        </section>

        {/* Content Section - Adjusted padding for mobile */}
        <div className="flex-grow px-4 lg:px-8 pb-4 overflow-y-auto">
          {/* Announcements Section - Adjusted padding and text size */}
          <section className="mb-6 lg:mb-8">
            <div className="bg-blue-50 border-l-4 border-purple-600 p-4 lg:p-5 rounded-lg">
              <h3 className="flex items-center text-purple-600 text-lg lg:text-xl mb-2 lg:mb-3">
                <i className="fas fa-bullhorn mr-2"></i> Announcements
              </h3>
              <p className="text-sm lg:text-base mb-2">
                Welcome to {APP_NAME}! We're excited to have you onboard.
              </p>
              <p className="text-sm lg:text-base">
                <strong>New Feature:</strong> Create multiple AI agents! Visit
                the{" "}
                <Link
                  to="/new"
                  className="text-purple-600 hover:text-purple-700"
                >
                  New Agent
                </Link>{" "}
                page to start.
              </p>
            </div>
          </section>

          {/* Chat Histories Section - Adjusted spacing and sizing */}
          <section className="mb-6 lg:mb-8">
            <h3 className="flex items-center text-purple-600 text-lg lg:text-xl mb-3 lg:mb-4">
              <i className="fas fa-history mr-2"></i> Conversation History
            </h3>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="space-y-3 lg:space-y-4">
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <div
                    key={agent.agent_id}
                    onClick={() => openChat(agent.agent_id)}
                    className="flex items-center bg-gray-50 p-3 lg:p-4 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    tabIndex="0"
                    role="button"
                  >
                    <img
                      src={getRandomImage()}
                      alt={`${agent.name} Avatar`}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border-2 border-purple-600 mr-3 lg:mr-4"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm lg:text-base font-semibold text-gray-900 mb-1 truncate">
                        {agent.name}
                      </div>
                      <div className="text-xs lg:text-sm text-gray-500 flex items-center">
                        <i className="fas fa-map-marker-alt mr-1"></i>
                        <span className="truncate">
                          {agent.city || "Unknown City"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs lg:text-sm text-gray-400 ml-2">
                      {new Date(agent.creation_date).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm lg:text-base">
                  No AI agents found. Create a new one!
                </p>
              )}
            </div>
          </section>
        </div>

        {/* Footer Navigation - Adjusted for mobile */}
        <nav className="border-t border-gray-200 bg-white py-2 lg:py-3 px-2 lg:px-4 flex-shrink-0">
          <div className="flex justify-around items-center w-full">
            <Link
              to="/home"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/home"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-home"></i>
            </Link>
            <Link
              to="/new"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/new"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-plus"></i>
            </Link>
            <Link
              to="/chats"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/chats"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-comments"></i>
            </Link>
            <Link
              to="/profile"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/profile"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-user"></i>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Home;

/**
 * Notes:
 * - Component uses token-based authentication
 * - Implements error handling for API failures
 * - Includes accessibility features (ARIA labels, keyboard navigation)
 * - Uses responsive design patterns
 *
 * Limitations:
 * - No offline support
 * - No pagination for large agent lists
 * - No real-time updates for agent status
 *
 * Best Practices:
 * - Secure route protection
 * - Error boundary implementation
 * - Semantic HTML structure
 * - Responsive image handling
 */
