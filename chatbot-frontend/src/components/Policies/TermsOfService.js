import React, { useState } from "react";
import { Link } from "react-router-dom";
import APP_NAME from "../../constants";

const TermsOfService = () => {
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
            Terms of Service
          </h1>

          {/* Acceptance of Terms */}
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing {APP_NAME}, you agree to be bound by these Terms of
            Service. If you do not agree, please discontinue use immediately.
          </p>

          {/* User Conduct */}
          <h2 className="text-xl font-semibold mb-2">2. User Conduct</h2>
          <p className="mb-4">
            You must use {APP_NAME} responsibly and comply with all applicable
            laws. Prohibited activities include harassment, distributing harmful
            content, or other unauthorized uses of our service.
          </p>

          {/* Account Responsibility */}
          <h2 className="text-xl font-semibold mb-2">
            3. Account Responsibility
          </h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            login credentials and any activities that occur under your account.
          </p>

          {/* Intellectual Property */}
          <h2 className="text-xl font-semibold mb-2">
            4. Intellectual Property
          </h2>
          <p className="mb-4">
            All content, trademarks, and software associated with {APP_NAME} are
            the property of their respective owners. Unauthorized use or
            duplication is strictly prohibited.
          </p>

          {/* Limitation of Liability */}
          <h2 className="text-xl font-semibold mb-2">
            5. Limitation of Liability
          </h2>
          <p className="mb-4">
            {APP_NAME} is provided “as is.” We are not liable for any direct,
            indirect, incidental, or consequential damages arising out of your
            use of the service.
          </p>

          {/* Termination & Updates */}
          <h2 className="text-xl font-semibold mb-2">
            6. Termination & Updates
          </h2>
          <p className="mb-4">
            We reserve the right to modify or terminate your access to the
            platform at any time. Your continued use following any policy update
            indicates acceptance of revised terms.
          </p>

          {/* Contact Information */}
          <h2 className="text-xl font-semibold mb-2">7. Contact Information</h2>
          <p>
            If you have any questions regarding these terms, reach out to us at
            support@{APP_NAME.toLowerCase()}.com.
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

export default TermsOfService;
