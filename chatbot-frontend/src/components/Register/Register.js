import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Changed from default import
import { DataContext } from "../../context/DataContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Corrected import
import APP_NAME from "../../constants";
import apiClient from "../../services/apiClient";
import { useGoogleLogin } from "@react-oauth/google";

/**
 * Register Component
 *
 * Handles the initial user registration by collecting basic information.
 * Utilizes Tailwind CSS for styling and ensures responsiveness across devices.
 */
const Register = () => {
  // Access shared user data state and navigation functionality from context
  const { userData, setUserData } = useContext(DataContext);
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  // State to manage terms acceptance
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  /**
   * Updates the user data in context when form fields change.
   *
   * @param {Object} e - Event object from input change
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  /**
   * Toggles the visibility of the password input.
   */
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  /**
   * Handles form submission and validation.
   * Navigates to the next registration step if validation passes.
   *
   * @param {Object} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username &&
      userData.email &&
      userData.password &&
      acceptedTerms
    ) {
      setIsLoading(true);
      try {
        const response = await apiClient.post("/auth/register", {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });

        const { token } = response.data;
        localStorage.setItem("token", token);

        // Clear sensitive data from context
        setUserData({
          ...userData,
          username: "",
          email: "",
          password: "",
        });

        navigate("/registration/page1");
      } catch (err) {
        console.error("Registration error:", err);
        alert(
          err.response?.data?.message ||
            "Registration failed. Please try again."
        );
      }
      setIsLoading(false);
    } else {
      alert("Please fill all fields and accept the terms.");
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
        console.error("Google signup error:", err);
        alert(err.response?.data?.message || "Google sign-up failed");
      }
    },
    onError: () => alert("Google Sign In Failed"),
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
      Sign up with Google
    </button>
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link to="/login" className="hover:underline px-2">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-purple-600 px-4 py-2 rounded-md hover:bg-purple-100 transition-colors inline-block"
            >
              Get Started
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
              Create Your Account
            </h2>

            {/* Username Input Field */}
            <div className="mb-6">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={userData.username || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                required
                aria-required="true"
              />
            </div>

            {/* Email Input Field */}
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={userData.email || ""}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                required
                aria-required="true"
              />
            </div>

            {/* Password Input Container with Fixed Height */}
            <div className="mb-8">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userData.password || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 transition duration-300"
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {userData.password && (
                <div className="mt-2">
                  <div className="flex h-2 bg-gray-200 rounded">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength >= 1
                          ? "w-1/4 bg-red-500"
                          : "w-1/4 bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded ${
                        passwordStrength >= 2
                          ? "w-1/4 bg-yellow-500"
                          : "w-1/4 bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded ${
                        passwordStrength >= 3
                          ? "w-1/4 bg-blue-500"
                          : "w-1/4 bg-gray-200"
                      }`}
                    ></div>
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === 4
                          ? "w-1/4 bg-green-500"
                          : "w-1/4 bg-gray-200"
                      }`}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">
                    Password Strength:{" "}
                    {passwordStrength <= 1
                      ? "Weak"
                      : passwordStrength === 2
                      ? "Fair"
                      : passwordStrength === 3
                      ? "Good"
                      : "Strong"}
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button without hover zoom effect */}
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
                  "Next"
                )}
              </button>

              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-gray-300 w-full"></div>
                <span className="bg-white px-2 text-gray-500">or</span>
                <div className="border-t border-gray-300 w-full"></div>
              </div>

              <CustomGoogleButton />
            </div>

            {/* Terms and Privacy Notice */}
            <div className="mt-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mr-2"
                  required
                  aria-required="true"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link to="/terms" className="text-purple-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-purple-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Navigation Links */}
            <div className="mt-8 space-y-4">
              {/* Link to Home Page */}
              <Link
                to="/home"
                className="block text-center text-purple-600 hover:underline hover:text-purple-800 transition-colors duration-300"
              >
                Back to <span className="font-semibold">Home</span>
              </Link>

              {/* Link to Login Page */}
              <Link
                to="/login"
                className="block text-center text-purple-600 hover:underline hover:text-purple-800 transition-colors duration-300"
              >
                Already have an account?{" "}
                <span className="font-semibold">Login</span>
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

export default Register;
