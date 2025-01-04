// Import the axios library for making HTTP requests
import axios from "axios";

// Create an axios instance with a predefined base URL for the API
// This instance will be used to make all API calls in the application
const apiClient = axios.create({
  baseURL: "BASE_URL", // Base URL for the API endpoints
});

// Add Google authentication endpoints
apiClient.googleAuth = async (accessToken) => {
  return await apiClient.post("/auth/google", { access_token: accessToken });
};

apiClient.completeGoogleRegistration = async (userData) => {
  return await apiClient.post("/auth/google/complete", userData);
};

// Add a request interceptor to include the Authorization header with the token
// This ensures that all outgoing requests include the token for authentication
apiClient.interceptors.request.use((config) => {
  // Retrieve the token from local storage
  const token = localStorage.getItem("token");
  // If a token exists, set the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Return the modified config object
  return config;
});

// Export the configured axios instance for use in other parts of the application
// This allows for consistent API calls throughout the application
export default apiClient;
