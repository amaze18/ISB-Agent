/**
 * NewAgent Component
 *
 * A form-based component that allows users to create a new AI companion/agent.
 * Handles the creation process including gender selection, relationship type,
 * and city selection with form validation and submission.
 */

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../services/apiClient";

import {
  FaMale,
  FaFemale,
  FaHeart,
  FaUserFriends,
  FaChalkboardTeacher,
  FaCity,
} from "react-icons/fa";
import APP_NAME from "../../constants";

/**
 * Utility function to generate random names for AI agents
 * @returns {string} A randomly selected name from a predefined list
 */
const generateRandomName = () => {
  const names = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley"];
  return names[Math.floor(Math.random() * names.length)];
};

/**
 * NewAgent Component
 *
 * Features:
 * - Random name generation for AI agents
 * - Gender selection (male/female)
 * - Relationship status selection (Friendship/Mentor/Romantic)
 * - City selection from predefined options
 * - Form validation and submission handling
 * - Success feedback and navigation
 */
const NewAgent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Default values and configurations for the form
  const defaultPersonalityTraits = ["Friendly", "Curious"];
  const defaultInterests = ["Music", "Technology"];
  const placeholderImage = "https://via.placeholder.com/150";

  /**
   * Form state management
   * Maintains all form fields including:
   * - agent_name: Random generated name
   * - agent_gender: Selected gender
   * - relationship_type: Type of relationship
   * - personality_traits: Predefined traits
   * - interests: Predefined interests
   * - image_url: Default avatar image
   * - city: Selected city
   */
  const [formData, setFormData] = useState({
    name: generateRandomName(),
    agent_gender: "",
    relationship_type: "",
    personality_traits: defaultPersonalityTraits,
    interests: defaultInterests,
    image_url: placeholderImage,
    city: "",
  });

  // State for managing success message display
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Generic handler for form field updates
   * @param {string} name - The field name to update
   * @param {any} value - The new value for the field
   */
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Form submission handler
   * Sends form data to backend API and handles response/errors
   * On success: Shows success message and redirects to home
   * On error: Displays error alert
   *
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to backend
      const response = await apiClient.post("/agents", formData);
      console.log("AI Agent Created:", response.data);
      setSuccessMessage("AI agent created successfully!");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error creating AI agent:", error);
      alert("Failed to create AI agent. Please try again.");
    }
  };

  // Form validation check
  const isFormComplete =
    formData.agent_gender && formData.relationship_type && formData.city;

  return (
    <div className="flex h-screen w-full overflow-hidden relative">
      {/* Left Sidebar - Hidden on mobile, 25% width on lg screens */}
      <div className="hidden lg:flex w-[25%] bg-white border-r border-gray-200 flex-col fixed h-full">
        {/* Logo */}
        <a
          href="/home"
          className="text-3xl font-bold text-[#9610FF] p-5 text-center"
        >
          {APP_NAME}
        </a>

        {/* Empty space that pushes navigation to bottom */}
        <div className="flex-grow" />

        {/* Desktop Navigation - Always at bottom of sidebar */}
        <div className="mt-auto">
          {" "}
          {/* This wrapper ensures navigation stays at bottom */}
          <nav className="border-t border-gray-200 bg-white py-3 px-4">
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
      </div>

      {/* Main Content - Full width on mobile, 75% on lg screens */}
      <div className="w-full lg:ml-[25%] lg:w-[75%] flex flex-col h-screen overflow-y-auto pb-20 lg:pb-0">
        {/* Container for the New Agent form content */}
        <div className="p-6 font-sans">
          {/* Example heading */}
          <h2 className="text-center text-[#9610FF] mb-8 text-2xl font-bold">
            Create a New Agent
          </h2>

          {/* Form container */}
          <form
            onSubmit={handleSubmit}
            className="max-w-[600px] mx-auto bg-[#F9F9F9] p-8 rounded-[12px] shadow relative
                       animate-fadeIn transition-all"
          >
            {/* Form group example */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#333] text-base">
                Enter Agent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg
                           focus:outline-none focus:border-[#9610FF]"
              />
            </div>

            {/* Gender selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#333] text-base">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div
                  onClick={() => handleChange("agent_gender", "male")}
                  className={`flex-1 p-4 rounded-lg text-center cursor-pointer
                    transition-all duration-300
                    ${
                      formData.agent_gender === "male"
                        ? "bg-[#9610FF] text-white"
                        : "bg-[#E0E0E0] text-black"
                    }
                  `}
                >
                  <FaMale />
                  <span>Male</span>
                </div>
                <div
                  onClick={() => handleChange("agent_gender", "female")}
                  className={`flex-1 p-4 rounded-lg text-center cursor-pointer
                    transition-all duration-300
                    ${
                      formData.agent_gender === "female"
                        ? "bg-[#9610FF] text-white"
                        : "bg-[#E0E0E0] text-black"
                    }
                  `}
                >
                  <FaFemale />
                  <span>Female</span>
                </div>
              </div>
            </div>

            {/* Relationship status */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#333] text-base">
                Relationship Status <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div
                  onClick={() => handleChange("relationship_type", "Friend")}
                  className={`flex-1 p-4 rounded-lg text-center cursor-pointer
                    transition-all duration-300
                    ${
                      formData.relationship_type === "Friend"
                        ? "bg-[#9610FF] text-white"
                        : "bg-[#E0E0E0] text-black"
                    }
                  `}
                >
                  <FaUserFriends />
                  <span>Friend</span>
                </div>
                <div
                  onClick={() => handleChange("relationship_type", "Mentor")}
                  className={`flex-1 p-4 rounded-lg text-center cursor-pointer
                    transition-all duration-300
                    ${
                      formData.relationship_type === "Mentor"
                        ? "bg-[#9610FF] text-white"
                        : "bg-[#E0E0E0] text-black"
                    }
                  `}
                >
                  <FaChalkboardTeacher />
                  <span>Mentor</span>
                </div>
                <div
                  onClick={() => handleChange("relationship_type", "Romantic")}
                  className={`flex-1 p-4 rounded-lg text-center cursor-pointer
                    transition-all duration-300
                    ${
                      formData.relationship_type === "Romantic"
                        ? "bg-[#9610FF] text-white"
                        : "bg-[#E0E0E0] text-black"
                    }
                  `}
                >
                  <FaHeart />
                  <span>Romantic</span>
                </div>
              </div>
            </div>

            {/* City selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2 text-[#333] text-base">
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <i className="fas fa-city text-[#9610FF] absolute top-1/2 left-3 -translate-y-1/2" />
                <select
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-10
                             focus:outline-none focus:border-[#9610FF]
                             bg-white bg-no-repeat bg-[right_1rem_center]"
                >
                  <option value="" disabled>
                    Select a city
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Pune">Pune</option>
                  <option value="Kigali">Kigali</option>
                  <option value="Tashkent">Tashkent</option>
                  <option value="Buenos Aires">Buenos Aires</option>
                  <option value="Kuala Lumpur">Kuala Lumpur</option>
                </select>
              </div>
            </div>

            {/* Submit button */}
            <div className="text-center mt-8">
              <button
                type="submit"
                disabled={!isFormComplete}
                className={`inline-block px-8 py-3 rounded-lg 
                  text-white font-semibold transition-transform duration-200
                  ${
                    !isFormComplete
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#9610FF] hover:bg-[#AF48FF] hover:scale-105"
                  }
                `}
              >
                Submit
              </button>
            </div>
          </form>

          {/* Success message */}
          {successMessage && (
            <div
              className="max-w-[600px] mx-auto mt-4 p-4 bg-[#DFF0D8] text-[#3C763D]
                            border border-[#D6E9C6] rounded-lg text-center
                            animate-fadeIn"
            >
              {successMessage}
            </div>
          )}
        </div>
      </div>

      {/* Separate Mobile Navigation - Only visible on mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white py-3 px-4 z-50">
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
              location.pathname === "/new" ? "text-purple-600" : "text-gray-400"
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
  );
};

export default NewAgent;
