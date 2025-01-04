/**
 * Page2 Component
 *
 * This component handles the second step of the registration flow where users can:
 * 1. Select the type of relationship they want with their AI agent
 * 2. Choose the gender of their AI agent
 *
 * The component uses Context API for state management and React Router for navigation.
 */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import APP_NAME from "../../constants";
import ProgressIndicator from "../shared/ProgressIndicator";

const Page2 = () => {
  // Context hook to access and update AI agent data across components
  const { aiAgentData, setAiAgentData } = useContext(DataContext);
  const navigate = useNavigate();

  // Local state management for form fields with initialization from context
  const [selectedRelationship, setSelectedRelationship] = useState(
    aiAgentData.relationship_type || ""
  );
  const [selectedGender, setSelectedGender] = useState(
    aiAgentData.agent_gender || ""
  );

  /**
   * Updates both local state and context when a relationship type is selected
   * @param {string} relationshipType - The selected relationship type
   */
  const handleRelationshipSelect = (relationshipType) => {
    setSelectedRelationship(relationshipType);
    setAiAgentData((prev) => ({
      ...prev,
      relationship_type: relationshipType,
    }));
  };

  /**
   * Handles gender selection changes and updates both local state and context
   * @param {Event} e - The change event from the select element
   */
  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setSelectedGender(gender);
    setAiAgentData((prev) => ({ ...prev, agent_gender: gender }));
  };

  /**
   * Form submission handler
   * Validates that both fields are completed before navigation
   * Shows an alert if validation fails
   */
  const handleSubmit = () => {
    if (selectedRelationship && selectedGender) {
      navigate("/registration/page3");
    } else {
      alert("Please complete all fields.");
    }
  };

  // Controls the enabled/disabled state of the continue button
  const isContinueEnabled = selectedRelationship && selectedGender;

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Mobile Logo Header */}

      <div className="md:hidden w-[100vw] bg-gradient-to-r from-[#9610FF] to-[#7F00E0] p-4 fixed top-0 z-10 left-0">
        <h1 className="text-2xl font-bold text-white text-center">
          {APP_NAME}
        </h1>
      </div>

      {/* Left Section */}
      <div className="w-full md:w-1/2 flex justify-center items-start p-4 md:p-8 mt-16 md:mt-0">
        <div className="flex flex-col w-full max-w-[500px]">
          <ProgressIndicator currentStep={1} totalSteps={3} />

          <div className="flex justify-between items-center mb-4 md:mb-6">
            <button
              className="text-xl md:text-2xl bg-none border-none cursor-pointer"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
            <h4 className="text-lg md:text-xl font-semibold px-2">
              What Are You Looking For?
            </h4>
            <button className="text-lg md:text-xl text-[#9610FF]">ℹ️</button>
          </div>
          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Relationship Options */}
            <p className="text-base text-[#212121]">
              What type of relationship would you like to have with your{" "}
              {APP_NAME}?
            </p>
            <div className="grid grid-cols-3 gap-4">
              <div
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedRelationship === "Friend"
                    ? "border-[#9610FF] bg-[rgba(150,16,255,0.05)] shadow-[0_0_12px_rgba(150,16,255,0.15)]"
                    : "border-[#EEEEEE] hover:border-[#9610FF] hover:bg-[rgba(150,16,255,0.02)]"
                }`}
                onClick={() => handleRelationshipSelect("Friend")}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="#9610FF"
                  >
                    <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 2.02 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                </div>
                <strong
                  className={`text-[16px] font-medium ${
                    selectedRelationship === "Friend"
                      ? "text-[#9610FF]"
                      : "text-[#212121]"
                  }`}
                >
                  Friend
                </strong>
              </div>
              <div
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedRelationship === "Mentor"
                    ? "border-[#9610FF] bg-[rgba(150,16,255,0.05)] shadow-[0_0_12px_rgba(150,16,255,0.15)]"
                    : "border-[#EEEEEE] hover:border-[#9610FF] hover:bg-[rgba(150,16,255,0.02)]"
                }`}
                onClick={() => handleRelationshipSelect("Mentor")}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="#9610FF"
                  >
                    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  </svg>
                </div>
                <strong
                  className={`text-[16px] font-medium ${
                    selectedRelationship === "Mentor"
                      ? "text-[#9610FF]"
                      : "text-[#212121]"
                  }`}
                >
                  Mentor
                </strong>
              </div>
              <div
                className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedRelationship === "Romantic"
                    ? "border-[#9610FF] bg-[rgba(150,16,255,0.05)] shadow-[0_0_12px_rgba(150,16,255,0.15)]"
                    : "border-[#EEEEEE] hover:border-[#9610FF] hover:bg-[rgba(150,16,255,0.02)]"
                }`}
                onClick={() => handleRelationshipSelect("Romantic")}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="#9610FF"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <strong
                  className={`text-[16px] font-medium ${
                    selectedRelationship === "Romantic"
                      ? "text-[#9610FF]"
                      : "text-[#212121]"
                  }`}
                >
                  Romantic
                </strong>
              </div>
            </div>
            <div className="flex flex-col mt-4">
              <p className="text-base text-[#212121]">
                Please select your {APP_NAME}'s gender:
              </p>
              <select
                name="agent_gender"
                aria-label="Gender"
                className="h-12 w-full rounded-lg px-4 bg-[#F5F5F5] text-[#9E9E9E] border border-[#F5F5F5] text-base cursor-pointer outline-none focus:border-[#9610FF] focus:bg-[rgba(150,16,255,0.08)] appearance-none"
                required
                value={selectedGender}
                onChange={handleGenderChange}
              >
                <option value="" hidden>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Nonbinary">Nonbinary</option>
              </select>
            </div>
          </div>
          <button
            type="button"
            className={`mt-6 w-full md:w-auto mx-auto rounded-full px-6 md:px-8 py-3 md:py-4 text-base font-semibold transition-all duration-300 ${
              isContinueEnabled
                ? "bg-[#9610FF] text-white hover:bg-[#8000FF] transform hover:scale-105"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isContinueEnabled}
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
      {/* Right Section - Hidden on mobile */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-b from-transparent to-[#9610FF]">
        <h1 className="text-5xl font-bold text-white m-0">{APP_NAME}</h1>
      </div>
    </div>
  );
};

/**
 * @component
 * @description
 * Page2 is part of a multi-step registration flow that collects user preferences
 * for their AI agent relationship. It ensures all required data is collected
 * before allowing progression to the next step.
 *
 * @notes
 * - Uses DataContext for state persistence across registration flow
 * - Implements form validation
 * - Provides user feedback through visual cues and alerts
 * - Maintains accessibility standards with ARIA labels
 */
export default Page2;
