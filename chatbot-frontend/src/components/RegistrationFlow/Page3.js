// Page3.js

/**
 * Page3 Component
 *
 * This component represents the final step in the AI agent registration flow.
 * It allows users to customize their AI agent by setting various attributes
 * including name, city, image, personality traits, and interests.
 *
 * Context Dependencies:
 * - DataContext: Provides aiAgentData, setAiAgentData, and userData
 */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import apiClient from "../../services/apiClient";
import APP_NAME from "../../constants";
import ProgressIndicator from "../shared/ProgressIndicator";

const Page3 = () => {
  // Context and navigation setup
  const { aiAgentData, setAiAgentData, userData } = useContext(DataContext);
  const navigate = useNavigate();

  /**
   * State Management
   * - All form fields are initialized with existing data from context or empty defaults
   * - Each state variable corresponds to a specific AI agent attribute
   */
  const predefinedPersonalityTraits = [
    "Friendly",
    "Curious",
    "Creative",
    "Analytical",
    "Optimistic",
    "Empathetic",
    "Dependable",
    "Adventurous",
    "Thoughtful",
    "Energetic",
  ];

  const predefinedInterests = [
    "Reading",
    "Traveling",
    "Cooking",
    "Music",
    "Sports",
    "Technology",
    "Art",
    "Gaming",
    "Fitness",
    "Photography",
    "Writing",
    "Gardening",
    "Movies",
    "Yoga",
    "Hiking",
  ];

  const randomNames = [
    "Aria",
    "Leo",
    "Mila",
    "Ethan",
    "Zara",
    "Liam",
    "Nora",
    "Owen",
    "Lily",
    "Noah",
    "Ava",
    "Mason",
    "Sophia",
    "James",
    "Isabella",
  ];

  // Initialize with random selections
  const getRandomItems = (list, num) =>
    list.sort(() => 0.5 - Math.random()).slice(0, num);

  const [name, setName] = useState("");
  const [personalityList, setPersonalityList] = useState([]);
  const [interestsList, setInterestsList] = useState([]);
  const [city, setCity] = useState("");
  const [imageURL] = useState("https://via.placeholder.com/300?text=Photo+1");

  useEffect(() => {
    // Auto-generate random name
    const randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    setName(randomName);
    setAiAgentData({
      ...aiAgentData,
      agent_name: randomName,
      image_url: imageURL,
    });

    // Set default personality traits and interests
    setPersonalityList(getRandomItems(predefinedPersonalityTraits, 4));
    setInterestsList(getRandomItems(predefinedInterests, 4));
    setAiAgentData({
      ...aiAgentData,
      personality_traits: getRandomItems(predefinedPersonalityTraits, 4),
      interests: getRandomItems(predefinedInterests, 4),
      image_url: imageURL,
    });
  }, []);

  // State to enable/disable the submit button based on form validation
  const [startChatEnabled, setStartChatEnabled] = useState(false);

  /**
   * Form Validation Effect
   * Monitors all required fields and enables/disables the submit button
   * Required fields: name, city, imageURL, personality traits, interests
   */
  useEffect(() => {
    const nameFilled = name.trim() !== "";
    const cityFilled = city.trim() !== "";
    const imageURLFilled = imageURL.trim() !== "";
    const personalityFilled = personalityList.length > 0;
    const interestsFilled = interestsList.length > 0;
    setStartChatEnabled(
      nameFilled &&
        cityFilled &&
        imageURLFilled &&
        personalityFilled &&
        interestsFilled
    );
  }, [name, city, imageURL, personalityList, interestsList]);

  /**
   * List Management Functions
   * Helper functions to manage personality traits and interests lists
   *
   * @param {Function} setter - State setter function
   * @param {string} type - Type of item being managed ('personality' or 'interest')
   */
  const addItem = (setter, type) => {
    const newItem = prompt(`Enter new ${type}:`);
    if (newItem && newItem.trim() !== "") {
      setter((prev) => [...prev, newItem.trim()]);
    }
  };

  const editItem = (setter, list, index, type) => {
    const editedItem = prompt(`Edit ${type}:`, list[index]);
    if (editedItem && editedItem.trim() !== "") {
      const updatedList = [...list];
      updatedList[index] = editedItem.trim();
      setter(updatedList);
    }
  };

  const deleteItem = (setter, list, index, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      setter(list.filter((_, i) => i !== index));
    }
  };

  /**
   * Form Submission Handler
   * Processes the final submission of AI agent data
   * 1. Creates user account
   * 2. Creates AI agent
   * 3. Stores authentication token
   * 4. Redirects to home page
   *
   * Error Handling:
   * - Network errors
   * - API response errors
   * - Unexpected errors
   */
  const handleStartChat = async () => {
    try {
      // Map `agent_name` to `name` in the payload
      const aiAgentPayload = {
        ...aiAgentData,
        name: name, // Rename `agent_name` to `name`
        personality_traits: personalityList,
        interests: interestsList,
        city: city,
        image_url: imageURL,
      };

      console.log("Final Payload for AI Agent:", aiAgentPayload);

      // Register User
      const registrationResponse = await apiClient.post(
        "/auth/register",
        userData
      );
      const token = registrationResponse.data.token;
      localStorage.setItem("token", token);

      // Create AI Agent
      const agentResponse = await apiClient.post("/agents", aiAgentPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("AI Agent Created:", agentResponse.data);
      navigate("/home");
    } catch (error) {
      console.error("Error during submission:", error);

      if (error.code === "ERR_NETWORK") {
        alert("Network Error: Please check your connection or backend server.");
      } else if (error.response) {
        alert(`API Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  // Add predefined cities
  const predefinedCities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

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
          <ProgressIndicator currentStep={2} totalSteps={3} />
          {/* 
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <button
              className="text-xl md:text-2xl bg-none border-none cursor-pointer"
              onClick={() => navigate(-1)}
            >
              ←
            </button>
            <h4 className="text-lg md:text-xl font-semibold">
              Customize Your AI Agent
            </h4>
            <button className="text-lg md:text-xl text-[#9610FF]">ℹ️</button>
          </div> */}

          <div className="flex flex-col w-full max-w-[600px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 md:mb-8 w-full">
              <button
                className="bg-none border-none cursor-pointer text-xl md:text-2xl"
                onClick={() => navigate(-1)}
              >
                ←
              </button>
              <h2 className="text-lg md:text-xl font-semibold px-2">
                Customize Your AI Agent
              </h2>
              <button className="text-lg md:text-xl text-[#9610FF]">ℹ️</button>
            </div>

            {/* Main Form Content */}
            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-4 md:gap-6">
              {/* Form fields stay the same but with responsive adjustments */}
              {/* Name Row */}
              <div className="flex items-center">
                <h3 className="text-base font-medium">Name:</h3>
              </div>
              <div className="flex items-center gap-4">
                <input
                  className="flex-1 border border-[#F5F5F5] bg-[#F5F5F5] rounded-xl px-4 py-2 focus:border-[#9610FF] focus:bg-[rgba(150,16,255,0.08)] outline-none"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setAiAgentData({
                      ...aiAgentData,
                      agent_name: e.target.value,
                    });
                  }}
                  placeholder="Enter Novi's name"
                />
                <button
                  className="bg-transparent border-none cursor-pointer text-xl hover:text-[#9610FF]"
                  onClick={() => {
                    const randomName =
                      randomNames[
                        Math.floor(Math.random() * randomNames.length)
                      ];
                    setName(randomName);
                    setAiAgentData({ ...aiAgentData, agent_name: randomName });
                  }}
                >
                  🎲
                </button>
              </div>

              {/* City Row */}
              <div className="flex items-center">
                <h3 className="text-base font-medium">City:</h3>
              </div>
              <div className="flex items-center">
                <select
                  className="flex-1 border border-[#F5F5F5] bg-[#F5F5F5] rounded-xl px-4 py-2 focus:border-[#9610FF] focus:bg-[rgba(150,16,255,0.08)] outline-none"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setAiAgentData({ ...aiAgentData, city: e.target.value });
                  }}
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

              {/* Personality Traits Row */}
              <div className="flex items-start pt-2">
                <h3 className="text-base font-medium">Personality:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalityList.map((trait, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-[#F5F5F5] rounded-full px-3 py-1"
                  >
                    <span>{trait}</span>
                    <button
                      onClick={() =>
                        editItem(
                          setPersonalityList,
                          personalityList,
                          index,
                          "personality"
                        )
                      }
                      className="text-gray-500 hover:text-[#9610FF]"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button
                      onClick={() =>
                        deleteItem(
                          setPersonalityList,
                          personalityList,
                          index,
                          "personality"
                        )
                      }
                      className="text-gray-500 hover:text-red-500"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button
                  className="text-[#9610FF] hover:text-[#7F00E0] p-1"
                  onClick={() => addItem(setPersonalityList, "personality")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 4v16m-8-8h16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>

              {/* Interests Row */}
              <div className="flex items-start pt-2">
                <h3 className="text-base font-medium">Interests:</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {interestsList.map((interest, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-[#F5F5F5] rounded-full px-3 py-1"
                  >
                    <span>{interest}</span>
                    <button
                      onClick={() =>
                        editItem(
                          setInterestsList,
                          interestsList,
                          index,
                          "interest"
                        )
                      }
                      className="text-gray-500 hover:text-[#9610FF]"
                    >
                      <span className="material-icons text-sm">edit</span>
                    </button>
                    <button
                      onClick={() =>
                        deleteItem(
                          setInterestsList,
                          interestsList,
                          index,
                          "interest"
                        )
                      }
                      className="text-gray-500 hover:text-red-500"
                    >
                      <span className="material-icons text-sm">close</span>
                    </button>
                  </div>
                ))}
                <button
                  className="text-[#9610FF] hover:text-[#7F00E0] p-1"
                  onClick={() => addItem(setInterestsList, "interest")}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M12 4v16m-8-8h16"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8 md:mt-12 mb-6 md:mb-0">
              <button
                type="button"
                className={`mt-6 w-full md:w-auto mx-auto rounded-full px-6 md:px-8 py-3 md:py-4 text-base font-semibold transition-all duration-300 ${
                  startChatEnabled
                    ? "bg-[#9610FF] text-white hover:bg-[#8000FF] transform hover:scale-105"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!startChatEnabled}
                onClick={handleStartChat}
              >
                Submit and Finish
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:flex w-1/2 justify-center items-center bg-gradient-to-b from-transparent to-[#9610FF]">
        <h1 className="text-5xl font-bold text-white m-0">{APP_NAME}</h1>
      </div>
    </div>
  );
};

// Export the component for use in the registration flow
export default Page3;
