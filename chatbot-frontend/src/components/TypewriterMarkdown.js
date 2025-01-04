// Import necessary libraries and hooks from React and other packages
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PropTypes from "prop-types";

// TypewriterMarkdown component: displays markdown content with a typewriter effect
const TypewriterMarkdown = ({ content, typingSpeed = 70 }) => {
  // State to hold the portion of content that has been "typed" so far
  const [displayedContent, setDisplayedContent] = useState("");

  // useEffect hook to handle the typewriter effect
  useEffect(() => {
    let currentIndex = 0; // Initialize the current index of the content to be displayed
    const interval = setInterval(() => {
      // Update the displayed content by slicing the original content up to the current index
      setDisplayedContent(content.slice(0, currentIndex + 1));
      currentIndex += 1; // Increment the index
      // Clear the interval when the entire content has been displayed
      if (currentIndex >= content.length) {
        clearInterval(interval);
      }
    }, typingSpeed); // Set the interval duration based on the typing speed

    // Cleanup function to clear the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [content, typingSpeed]); // Dependencies: re-run the effect if content or typingSpeed changes

  // Render the markdown content using ReactMarkdown with the GFM plugin
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {displayedContent}
    </ReactMarkdown>
  );
};

// Define prop types for the component
TypewriterMarkdown.propTypes = {
  content: PropTypes.string.isRequired, // The markdown content to be displayed
  typingSpeed: PropTypes.number, // Typing speed in milliseconds per character
};

// Export the component as the default export
export default TypewriterMarkdown;
