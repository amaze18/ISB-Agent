// Importing necessary libraries and components
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Importing global CSS styles
import App from "./App"; // Main App component
import { DataProvider } from "./context/DataContext"; // Context provider for managing global state
import { GoogleOAuthProvider } from "@react-oauth/google";

import reportWebVitals from "./reportWebVitals"; // Performance measuring tool

import "@fortawesome/fontawesome-free/css/all.min.css"; // Importing FontAwesome icons

// Add global styles
const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
      
      :root {
        --primary-color: #9610FF;
        --primary-light: #AF48FF;
        --gray-100: #F3F4F6;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Roboto', sans-serif;
        @apply bg-gray-50;
      }

      #root {
        @apply h-screen overflow-hidden;
        width: 100%;
      }
    `}
  </style>
);

// Creating a root element for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application within the root element
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <DataProvider>
        <App />
      </DataProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// Function to measure and report web vitals for performance analysis
// You can pass a function to log results (e.g., reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
