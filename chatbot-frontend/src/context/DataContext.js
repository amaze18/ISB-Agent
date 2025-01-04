import React, { createContext, useState } from "react";

// Create Context
// This context will be used to share data across the component tree without passing props down manually at every level.
export const DataContext = createContext();

// Provider Component
// This component will wrap around any components that need access to the shared state.
export const DataProvider = ({ children }) => {
  // State for User Data
  // This state holds the user information such as full name, username, email, etc.
  const [userData, setUserData] = useState({
    full_name: "", // User's full name
    date_of_birth: "", // User's date of birth
    gender: "", // User's gender
  });

  // State for AI Agent Data
  // This state holds the AI agent's information such as relationship type, gender, name, etc.
  const [aiAgentData, setAiAgentData] = useState({
    relationship_type: "", // Type of relationship with the AI agent (e.g., friend, mentor)
    agent_gender: "", // Gender of the AI agent
    agent_name: "", // Name of the AI agent
    personality_traits: [], // List of personality traits of the AI agent
    interests: [], // List of interests of the AI agent
    city: "", // City where the AI agent is based
    image_url: "", // URL of the AI agent's image
  });

  return (
    // The DataContext.Provider component makes the state available to any nested components that need it.
    <DataContext.Provider
      value={{
        userData, // User data state
        setUserData, // Function to update user data
        aiAgentData, // AI agent data state
        setAiAgentData, // Function to update AI agent data
      }}
    >
      {children}{" "}
      {/* Render any child components that need access to the context */}
    </DataContext.Provider>
  );
};
