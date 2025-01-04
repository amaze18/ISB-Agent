import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Changed from default import
import apiClient from "../../services/apiClient";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Corrected import
import APP_NAME from "../../constants";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

/**
 * Login Component
 *
 * Handles user authentication by collecting credentials and communicating with the API.
 * Utilizes Tailwind CSS for styling and ensures responsiveness across devices.
 */
const Login = () => {
  // State to store user credentials
  const [credentials, setCredentials] = useState({
    username_or_email: "",
    password: "",
  });

  // State to store error messages
  const [error, setError] = useState(null);

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // useNavigate hook to programmatically navigate to different routes
  const navigate = useNavigate();

  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Handles input changes and updates the credentials state.
   *
   * @param {Object} e - Event object from input change
   */
  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  /**
   * Toggles the visibility of the password input.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Handles form submission for user login.
   * Communicates with the API and manages authentication tokens.
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    setIsLoading(true); // Start loading
    setError(null); // Reset previous errors
    try {
      // API call to authenticate the user
      const response = await apiClient.post("/auth/login", credentials);
      const { token } = response.data;

      // Store the token in local storage for session management
      localStorage.setItem("token", token);

      // Navigate to the home page upon successful login
      navigate("/home");
    } catch (err) {
      // Log the error and set an error message for the user
      console.error("Login error:", err);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );
        const googleUser = await userInfo.json();

        const googleData = {
          email: googleUser.email,
          name: googleUser.name,
          oauth_id: googleUser.sub,
        };

        const authResponse = await apiClient.post("/auth/google", googleData);
        const { token, isNewUser } = authResponse.data;

        localStorage.setItem("token", token);

        if (isNewUser) {
          navigate("/registration/page1");
        } else {
          navigate("/home");
        }
      } catch (err) {
        console.error("Google login error:", err);
        setError(err.response?.data?.message || "Google sign-in failed");
      }
    },
    onError: () => setError("Google Sign In Failed"),
  });

  const CustomGoogleButton = () => (
    <button
      onClick={() => googleLogin()}
      className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-md py-3 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium shadow-sm"
    >
      <svg width="20" height="20" viewBox="0 0 48 48">
        <path
          fill="#FFC107"
          d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
        />
        <path
          fill="#FF3D00"
          d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
        />
      </svg>
      Continue with Google
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-purple-600 text-white py-4 shadow-md z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-6">
          <Link to="/home" className="text-2xl md:text-3xl font-bold">
            {APP_NAME}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <nav
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 md:space-x-4 space-y-2 md:space-y-0`}
          >
            <Link to="/home" className="hover:underline px-2">
              Home
            </Link>
            <Link to="/about" className="hover:underline px-2">
              About Us
            </Link>
            <Link to="/features" className="hover:underline px-2">
              Features
            </Link>
            <Link to="/register" className="hover:underline px-2">
              Register
            </Link>
            <Link
              to="/login"
              className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors inline-block"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content with proper spacing from fixed header */}
      <main className="flex-grow flex items-center justify-center bg-purple-50 px-4 mt-16 mb-16">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            {/* Form Header with adjusted text size */}
            <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-6 text-center animate-fadeInUp">
              Welcome Back!
            </h2>

            {/* Display error message if any */}
            {error && (
              <p className="text-red-500 text-sm mb-6 text-center" role="alert">
                {error}
              </p>
            )}

            {/* Username or Email Input Field */}
            <div className="mb-6">
              <label htmlFor="username_or_email" className="sr-only">
                Username or Email
              </label>
              <input
                id="username_or_email"
                name="username_or_email"
                type="text"
                placeholder="Username or Email"
                value={credentials.username_or_email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                required
                aria-required="true"
              />
            </div>

            {/* Password Input Field with Visibility Toggle */}
            <div className="mb-8 relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                required
                aria-required="true"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-4">
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3 rounded-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-2 text-gray-500">or</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <CustomGoogleButton />
            </div>

            {/* Navigation Links */}
            <div className="mt-8 space-y-4">
              {/* Link to Register Page */}
              <Link
                to="/register"
                className="block text-center text-purple-600 hover:underline hover:text-purple-800 transition-colors duration-300"
              >
                Don't have an account?{" "}
                <span className="font-semibold">Register</span>
              </Link>

              {/* Link to Home Page */}
              <Link
                to="/home"
                className="block text-center text-purple-600 hover:underline hover:text-purple-800 transition-colors duration-300"
              >
                Back to <span className="font-semibold">Home</span>
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-purple-600 text-white py-4 z-50">
        <div className="container mx-auto flex flex-col items-center space-y-4 px-4">
          <div className="flex justify-center space-x-4">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact Us
            </Link>
          </div>
          <p>
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
