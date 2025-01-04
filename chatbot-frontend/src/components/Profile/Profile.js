import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import APP_NAME from "../../constants";

/**
 * Configuration object defining the available sections in the profile sidebar.
 * Each section has an id, display title, and associated icon class.
 */
const profileSections = [
  {
    id: "profile-settings",
    title: "Profile Settings",
    icon: "fas fa-user-cog",
  },
  { id: "account-settings", title: "Account Settings", icon: "fas fa-cogs" },
  {
    id: "agent-information",
    title: "Agent Information",
    icon: "fas fa-info-circle",
  },
  { id: "credits", title: "Credits", icon: "fas fa-coins" },
  { id: "help", title: "Help", icon: "fas fa-question-circle" },
  { id: "logout", title: "Logout", icon: "fas fa-sign-out-alt" },
];

/**
 * Profile Component
 *
 * A comprehensive user profile management interface that allows users to:
 * - View and edit their profile information
 * - Manage account settings
 * - Configure notification preferences
 * - View agent information
 * - Manage credits
 * - Access help
 * - Logout
 *
 * The component uses a sidebar navigation pattern with a main content area
 * that updates based on the selected section.
 */
const Profile = () => {
  // Navigation and routing hooks
  const location = useLocation();
  const navigate = useNavigate();

  // State to track the currently active section in the sidebar
  const [activeSection, setActiveSection] = useState("profile-settings");
  const [isMobileContentVisible, setIsMobileContentVisible] = useState(false);

  /**
   * User profile data structure containing personal information,
   * preferences, and notification settings
   */
  const [profileData, setProfileData] = useState({
    username: "createunique001",
    dateOfBirth: "2000-01-01",
    gender: "Male",
    theme: "Dark Mode",
    deviceDefault: true,
    notifications: {
      sound: false, // Sound notifications are off
      vibration: true, // Vibration notifications are on
    },
    // Additional profile fields can be added here
  });

  /**
   * Handles navigation between different profile sections
   * @param {string} sectionId - The ID of the section to navigate to
   */
  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    // Show content view on mobile when nav item is clicked
    if (window.innerWidth < 768) {
      setIsMobileContentVisible(true);
    }
  };

  const handleBackClick = () => {
    setIsMobileContentVisible(false);
  };

  /**
   * Handles form input changes, supporting both regular inputs and nested notification settings
   * @param {Event} e - The input change event
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("notifications")) {
      setProfileData({
        ...profileData,
        notifications: {
          ...profileData.notifications,
          [name.split(".")[1]]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  /**
   * Handles the submission of profile updates
   * @param {Event} e - The form submission event
   * TODO: Implement actual API call to update profile
   */
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Profile updated.");
  };

  /**
   * Handles user logout by clearing local storage and redirecting to login page
   * TODO: Implement proper session termination with backend
   */
  const logout = () => {
    // Handle logout logic here
    alert("You have been logged out.");
    // Clear local storage and redirect to login page
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar - Full width on mobile */}
      <div
        className={`md:w-[25%] w-full bg-white border-r border-gray-200 flex flex-col
        ${isMobileContentVisible ? "hidden md:flex" : "flex"}`}
      >
        {/* Logo */}
        <a
          href="/home"
          className="text-3xl font-bold text-[#9610FF] p-5 text-center"
        >
          {APP_NAME}
        </a>

        <div className="flex-1 overflow-y-auto px-4 w-full flex flex-col items-center">
          {/* Top: Name, @username, Avatar */}
          <div className="mt-4 text-center">
            <h3 className="text-xl font-semibold">Skylar</h3>
            <p className="text-sm text-gray-500 mb-4">Friend</p>
            <div className="w-20 h-20 rounded-full border-2 border-[#9610FF] mx-auto mb-6 flex items-center justify-center">
              <img
                src="/images/MaleChurch.avif"
                alt="User Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Menu Items (6 rows) */}
          <div className="space-y-2 w-full">
            {profileSections.map((section) => (
              <button
                key={section.id}
                className={`flex items-center gap-2 p-3 rounded-lg hover:bg-[#F3E8FF] w-full text-left ${
                  activeSection === section.id ? "bg-[#E0D4FF]" : ""
                }`}
                onClick={() => {
                  if (section.id === "logout") {
                    logout();
                  } else {
                    handleNavClick(section.id);
                  }
                }}
              >
                <i
                  className={`${section.icon} text-[#9610FF] w-5 text-center`}
                ></i>
                <span className="font-medium text-gray-700">
                  {section.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <nav className="border-t border-gray-200 bg-white py-3 px-4 flex-shrink-0">
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
                location.pathname.startsWith("/chats")
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

      {/* Main Content - Hidden on mobile by default, shown when content is selected */}
      <div
        className={`md:w-[75%] w-full flex flex-col overflow-hidden
        ${isMobileContentVisible ? "flex" : "hidden md:flex"}`}
      >
        {/* Mobile back button */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-200">
          <button onClick={handleBackClick} className="text-[#9610FF] mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <h2 className="text-2xl font-semibold text-[#9610FF]">
            {
              profileSections.find((section) => section.id === activeSection)
                ?.title
            }
          </h2>
        </div>

        {/* Desktop header - hidden on mobile */}
        <div className="hidden md:block border-b border-gray-200 p-4">
          <h2 className="text-2xl font-semibold text-[#9610FF]">
            {
              profileSections.find((section) => section.id === activeSection)
                ?.title
            }
          </h2>
        </div>

        {/* Main content area */}
        <div className="overflow-y-auto p-6">
          {/* Profile Settings Section */}
          {activeSection === "profile-settings" && (
            <div className="profile-section active border bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#9610FF]">
                Your Profile
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#9610FF]"
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="block mb-1 font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#9610FF]"
                    type="date"
                    name="dateOfBirth"
                    value={profileData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="block mb-1 font-medium text-gray-700">
                    Gender
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#9610FF]"
                    name="gender"
                    value={profileData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="block mb-1 font-medium text-gray-700">
                    Theme
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#9610FF]"
                    name="theme"
                    value={profileData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="Dark Mode">Dark Mode</option>
                    <option value="Light Mode">Light Mode</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="block mb-1 font-medium text-gray-700">
                    Device Default
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#9610FF]"
                    type="checkbox"
                    name="deviceDefault"
                    checked={profileData.deviceDefault}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label className="block mb-1 font-medium text-gray-700">
                    Notifications
                  </label>
                  <div className="flex items-center space-x-4 mt-2">
                    <label className="flex items-center text-gray-700 space-x-2">
                      Sound
                      <input
                        type="checkbox"
                        name="notifications.sound"
                        checked={profileData.notifications.sound}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex items-center text-gray-700 space-x-2">
                      Vibration
                      <input
                        type="checkbox"
                        name="notifications.vibration"
                        checked={profileData.notifications.vibration}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#9610FF] text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Update
                </button>
              </form>
            </div>
          )}

          {/* Account Settings Section */}
          {activeSection === "account-settings" && (
            <div className="profile-section active border bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#9610FF]">
                Account Settings
              </h3>
              <p className="text-gray-600">
                <strong>Login Method:</strong> Google
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> tempgmail@gmail.com
              </p>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors">
                Delete Account
              </button>
            </div>
          )}

          {/* Agent Information Section */}
          {activeSection === "agent-information" && (
            <div className="profile-section active border bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#9610FF]">
                Agents Information
              </h3>
              <p>Active Agents: 1/1</p>
              <div className="nomi-list space-y-3 mt-4">
                <div className="nomi-item border p-4 rounded-md hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-semibold text-[#9610FF]">
                    Skylar
                  </h4>
                  {/* Additional Nomi details can be added here */}
                </div>
                {/* List other Nomis if any */}
              </div>
            </div>
          )}

          {/* Credits Section */}
          {activeSection === "credits" && (
            <div className="profile-section active border bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#9610FF]">Credits</h3>
              <p className="text-gray-600">You have 100 credits remaining.</p>
              <button className="bg-[#9610FF] text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
                Purchase Credits
              </button>
            </div>
          )}

          {/* Help Section */}
          {activeSection === "help" && (
            <div className="profile-section active border bg-white rounded-lg shadow-sm p-6 space-y-4">
              <h3 className="text-xl font-semibold text-[#9610FF]">Help</h3>
              <p className="text-gray-600">How can we assist you?</p>
              {/* Help content can be added here */}
            </div>
          )}

          {/* Dynamic section rendering for all sections */}
          {profileSections.map((section) => (
            <div
              key={section.id}
              className={`profile-section ${
                activeSection === section.id
                  ? "active border bg-white rounded-lg shadow-sm p-6 space-y-4"
                  : "hidden"
              }`}
            >
              <h3 className="text-xl font-semibold text-[#9610FF]">
                {section.title}
              </h3>
              <p className="text-gray-600">
                Content for {section.title} goes here.
              </p>
              {section.id === "logout" && (
                <button onClick={logout}>Logout</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
