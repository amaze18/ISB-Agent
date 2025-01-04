import React, { useState } from "react";
import { Link } from "react-router-dom";
import APP_NAME from "../../constants";

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
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
        <div className="max-w-3xl text-gray-700">
          <h1 className="text-3xl font-extrabold text-purple-800 mb-8">
            Privacy Policy
          </h1>
          {/* Data Collection */}
          <h2 className="text-xl font-semibold mb-2">1. Data Collection</h2>
          <p className="mb-4">
            We collect necessary personal information, such as your name and
            email, to create and manage your account. Additional data (e.g.,
            preferences) may be gathered to tailor your AI interactions.
          </p>

          {/* Data Usage */}
          <h2 className="text-xl font-semibold mb-2">2. Data Usage</h2>
          <p className="mb-4">
            We use collected data to improve your experience, personalize
            features, and ensure security. We do not sell user data to third
            parties.
          </p>

          {/* Data Storage and Security */}
          <h2 className="text-xl font-semibold mb-2">
            3. Data Storage & Security
          </h2>
          <p className="mb-4">
            Your data is stored securely with industry-standard safeguards. We
            routinely monitor and update our infrastructure to protect against
            unauthorized access and potential data breaches.
          </p>

          {/* Third-Party Services */}
          <h2 className="text-xl font-semibold mb-2">
            4. Third-Party Services
          </h2>
          <p className="mb-4">
            Some features may rely on trusted third-party providers (e.g.,
            analytics). We only share minimal data as needed to deliver or
            improve our services.
          </p>

          {/* Children's Privacy */}
          <h2 className="text-xl font-semibold mb-2">5. Children's Privacy</h2>
          <p className="mb-4">
            {APP_NAME} is not intended for individuals under a certain age
            without parental consent. We do not knowingly collect personal
            information from minors.
          </p>

          {/* Changes to this Policy */}
          <h2 className="text-xl font-semibold mb-2">
            6. Changes to this Policy
          </h2>
          <p className="mb-4">
            We may update our Privacy Policy to reflect changes in our practices
            or legal requirements. You will be notified of any significant
            modifications.
          </p>

          {/* Contact Us */}
          <h2 className="text-xl font-semibold mb-2">7. Contact Us</h2>
          <p>
            For any questions or concerns about your privacy, please contact us
            at support@{APP_NAME.toLowerCase()}.com.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-600 text-white py-4">
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

export default PrivacyPolicy;
