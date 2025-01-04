import React, { useState } from "react";
import { Link } from "react-router-dom";
import APP_NAME from "../../constants";

const Features = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-purple-600 text-white py-4 shadow-md z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-6">
          <Link to="/" className="text-2xl md:text-3xl font-bold">
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
            <Link to="/" className="hover:underline px-2">
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

      <main className="flex-grow flex items-center justify-center pt-16 px-4 pb-16">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold text-purple-800 mb-8">
            Features
          </h1>

          {/* Cultural Conversations */}
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Cultural Conversations
          </h2>
          <p className="text-gray-700 mb-4">
            Engage in region-specific, culturally-aware exchanges with AI that
            understands local traditions and mannerisms.
          </p>

          {/* Emotional Intelligence */}
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Emotional Intelligence
          </h2>
          <p className="text-gray-700 mb-4">
            Experience empathetic dialogues that resonate with your feelings,
            enabling genuine connections that go beyond simple text.
          </p>

          {/* Multi-Personality AI */}
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Multi-Personality AI
          </h2>
          <p className="text-gray-700">
            Select from diverse AI personas tailored to different communication
            styles, from friendly companions to professional advisors.
          </p>
        </div>
      </main>

      {/* Footer */}
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
          <p>© 2024 Novi. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
