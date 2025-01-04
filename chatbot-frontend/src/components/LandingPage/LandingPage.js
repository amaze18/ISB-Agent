import React, { useState } from "react";
import { Link } from "react-router-dom";
import APP_NAME from "../../constants";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex flex-col">
      {/* Header */}
      <header className="bg-purple-600 text-white py-4 shadow-md relative">
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

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between text-center md:text-left py-8 md:py-16 px-4 md:px-6 container mx-auto overflow-hidden">
        <div className="w-full md:max-w-lg">
          <h2 className="text-3xl md:text-5xl font-extrabold text-purple-800 mb-4 md:mb-6 animate-fadeInUp">
            Your AI Cultural Companion 🌍💡
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Explore traditions, histories, and emotional well-being with Novi.
            Bridging cultural gaps through AI-driven interactions that are
            intelligent, empathetic, and unique to your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-transform transform hover:scale-105 w-full sm:w-auto text-center"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="bg-white text-purple-600 px-6 py-3 rounded-md hover:bg-purple-100 transition-transform transform hover:scale-105 w-full sm:w-auto text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-0 w-full md:w-auto">
          <img
            src="/images/landingimg/hero-image.png"
            alt="Hero"
            className="max-w-full h-auto rounded-lg shadow-lg animate-fadeIn mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <div className="container mx-auto">
          <h3 className="text-4xl font-bold text-center text-purple-800 mb-12">
            Key Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 shadow-lg rounded-lg bg-purple-50 transform transition-transform hover:scale-105">
              <img
                src="/images/landingimg/feature-icon1.png"
                alt="Cultural Conversations"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-4">
                Cultural Conversations
              </h4>
              <p className="text-gray-600">
                Engage in culturally-aware interactions with AI that understand
                regional nuances and traditions.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="text-center p-6 shadow-lg rounded-lg bg-purple-50 transform transition-transform hover:scale-105">
              <img
                src="/images/landingimg/feature-icon2.webp"
                alt="Emotional Intelligence"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-4">
                Emotional Intelligence
              </h4>
              <p className="text-gray-600">
                Experience AI companions with empathetic and emotionally
                intelligent responses.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="text-center p-6 shadow-lg rounded-lg bg-purple-50 transform transition-transform hover:scale-105">
              <img
                src="/images/landingimg/feature-icon3.webp"
                alt="Multi-Personality AI"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold mb-4">
                Multi-Personality AI
              </h4>
              <p className="text-gray-600">
                Choose from a range of AI personalities tailored to your needs
                and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-purple-100 py-16 px-6">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold text-purple-800 mb-12">
            What Our Users Say
          </h3>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <img
              src="/images/landingimg/MaleChurch.avif"
              alt="Testimonial Avatar"
              className="w-24 h-24 rounded-full shadow-lg"
            />
            <blockquote className="max-w-lg text-xl italic text-gray-700">
              "Novi has changed the way I understand and interact with different
              cultures. It's like having a knowledgeable and empathetic friend
              available 24/7!"
            </blockquote>
            <p className="text-lg font-semibold text-purple-600 mt-4">
              - A Happy User
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-8">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p>© 2024 Novi. All rights reserved.</p>
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
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
