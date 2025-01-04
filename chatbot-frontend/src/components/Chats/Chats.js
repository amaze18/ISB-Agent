import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../services/apiClient";
import APP_NAME from "../../constants";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEditablePrompts } from "../../lib/prompts.ts";
import TypewriterMarkdown from "../TypewriterMarkdown";
const apiUrl = process.env.REACT_APP_API_URL;
console.log("API :", apiUrl);

const Chats = () => {
  // Router and navigation hooks
  const location = useLocation();
  const { getPrompt } = useEditablePrompts();

  const { agent_id } = useParams();
  const navigate = useNavigate();

  const [activeContent, setActiveContent] = useState(null);
  const [showSettingsPopover, setShowSettingsPopover] = useState(false);

  // New state variable for agent details
  const [agentDetails, setAgentDetails] = useState(null);

  // Add dummy data
  const dummyAgentDetails = {
    name: "Sophie",
    avatar: "https://pixlr.com/images/index/ai-image-generator-one.webp", // Placeholder image
    city: "New York",
    relationship_status: "Single",
    gender: "Female",
  };

  // Functional state variables from code2
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    // Initial entry message
    {
      role: "assistant",
      content: `Hi there! What brings you here today? How are you feeling!`,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ref for scrolling to the bottom of messages
  const messagesEndRef = useRef(null);

  const [selectedReactions, setSelectedReactions] = useState({});

  const getFormattedDate = () => {
    const options = {
      weekday: "short", // "Sun"
      month: "short", // "Dec"
      day: "2-digit", // "01"
      year: "numeric", // "2024"
    };
    return new Date().toLocaleDateString("en-US", options);
  };

  const formattedDate = getFormattedDate();

  const handleReaction = (messageIndex, reaction) => {
    setSelectedReactions((prev) => {
      const messageReactions = prev[messageIndex] || [];
      if (messageReactions.includes(reaction)) {
        // Deselect the reaction
        const updatedReactions = messageReactions.filter((r) => r !== reaction);
        if (updatedReactions.length === 0) {
          const { [messageIndex]: _, ...rest } = prev;
          return rest;
        }
        return {
          ...prev,
          [messageIndex]: updatedReactions,
        };
      } else {
        // Select the reaction
        return {
          ...prev,
          [messageIndex]: [reaction],
        };
      }
    });
  };

  const getPersonalityKey = (city, relationshipStatus, gender) => {
    const cityKey = city.toLowerCase().replace(/\s+/g, "_"); // Normalize the city
    const relationshipKey = relationshipStatus.toLowerCase();
    const genderKey = gender.toLowerCase();
    return `${cityKey}_${relationshipKey}_${genderKey}`;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // No token, redirect to login or landing page
        navigate("/");
        return;
      }

      try {
        if (!agent_id) {
          // If agent_id is not present, fetch the first agent
          const response = await apiClient.get("/agents", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const agents = response.data.agents;
          if (agents.length > 0) {
            // Redirect to /chats/:agent_id
            navigate(`/chats/${agents[0].agent_id}`);
          } else {
            // No agents, redirect to create new agent
            navigate("/new");
          }
        } else {
          // Fetch agent details using agent_id
          const response = await apiClient.get(`/agents/${agent_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const agent = response.data.agent;
          setAgentDetails(agent);

          console.log("Fetched Agent Details:", agent);
        }
      } catch (error) {
        console.error("Error fetching agent details:", error);
        // Handle error, perhaps redirect or show error message
      }
    };

    fetchAgentDetails();
  }, [agent_id, navigate]);

  const handleIconClick = (contentType) => {
    setActiveContent(contentType);
  };

  const handleBack = () => {
    setActiveContent(null);
    setNewMessageId(null); // Reset when returning to chat
  };

  const handleSettingsClick = (e) => {
    e.stopPropagation();
    setShowSettingsPopover(!showSettingsPopover);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowSettingsPopover(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside (optional for better UX)
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        sidebarOpen &&
        !e.target.closest(".sidebar") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [sidebarOpen]);

  // Add new state to track messages that should show typewriter effect
  const [typingMessages, setTypingMessages] = useState(new Set());

  // Add new state to track only new bot responses
  const [newMessageId, setNewMessageId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage = {
      role: "user",
      content: message,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await axios.post("API_URL", {
        prompt: message,
        message_history: updatedMessages,
        personality: "friendly",
      });

      const botMessage = {
        role: "assistant",
        content: response.data.rag_response || "",
        timestamp: new Date(),
      };

      // Only set the latest message for typewriter effect
      setNewMessageId(messages.length + 1);
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const renderDynamicContent = () => {
    switch (activeContent) {
      case "call":
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-[#9610FF] mb-6">
              Call History
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
                <i className="fas fa-phone-alt text-[#9610FF]"></i>
                <span className="text-gray-700">
                  Last call: Yesterday, 2:30 PM
                </span>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-lg">
                <i className="fas fa-phone-alt text-[#9610FF]"></i>
                <span className="text-gray-700">Duration: 15 minutes</span>
              </div>
            </div>
          </div>
        );

      case "paint":
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#9610FF] mb-4">
              Make Culture Agent Art
            </h2>
            <p className="text-gray-600 mb-6">
              Your imagination is the limit! Select your style below and create
              anime, fantasy, cartoon, and other creative images with Art, or do
              photo shoots with your Cultura using Realistic.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg text-[#9610FF] font-medium">
              You have 2 / 2 requests remaining today
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#9610FF] mb-6">
              Cultura - Photo Album
            </h2>
            <div className="flex gap-6 border-b border-gray-200 pb-4 mb-6">
              <p className="font-semibold text-[#9610FF]">Profile Picture</p>
              <p className="text-gray-600 hover:text-[#9610FF] cursor-pointer">
                All
              </p>
              <p className="text-gray-600 hover:text-[#9610FF] cursor-pointer">
                Photos
              </p>
              <p className="text-gray-600 hover:text-[#9610FF] cursor-pointer">
                Art
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <img
                  src="/assets/images/picture1.jpg"
                  alt="Gallery Item"
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <p className="text-gray-600">Image Description</p>
              </div>
            </div>
          </div>
        );

      case "options":
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#9610FF] mb-4">
              Cultura
            </h2>
            <h3 className="text-xl font-medium text-gray-700 mb-6">
              Proactive Cultura Messages
            </h3>
            <div className="space-y-4">
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#9610FF] focus:ring-1 focus:ring-[#9610FF]">
                <option>Select frequency</option>
                {/* Add options */}
              </select>
              <button className="w-full bg-[#9610FF] text-white py-3 rounded-lg hover:bg-[#8000FF] transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        );

      case "sharedNotes":
        return (
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-[#9610FF] mb-4">
              Shared Notes
            </h2>
            <p className="text-gray-600 mb-6">
              Shared notes allow you to communicate what is most important to
              you.
            </p>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:border-[#9610FF] focus:ring-1 focus:ring-[#9610FF] h-40"
              placeholder="Add your notes here..."
            ></textarea>
          </div>
        );

      default:
        return null;
    }
  };

  // Determine the index of the last assistant message
  const lastAssistantIndex = messages
    .map((msg, index) => (msg.role === "assistant" ? index : -1))
    .filter((index) => index !== -1)
    .pop();

  // Add new state for image preview
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Add scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Modify useEffect for scroll behavior
  useEffect(() => {
    const messageContainer = document.querySelector(".message-container");
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [messages]);

  // Add image preview handler
  const handleImageClick = () => {
    setShowImagePreview(true);
  };

  /**
   * Main Component Render
   * -----------------------------
   */
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Mobile Header - Enhanced with avatar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-40">
        <div className="flex items-center p-4 gap-3">
          <button onClick={() => navigate("/home")} className="text-gray-600">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>

          {/* Agent Avatar */}
          <button
            onClick={handleImageClick}
            className="flex-shrink-0 relative w-8 h-8 rounded-full overflow-hidden border-2 border-purple-100"
          >
            <img
              src="/images/local-agent-image.webp"
              alt="Agent"
              className="w-full h-full object-cover"
            />
          </button>

          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-lg font-semibold">
              {(agentDetails || dummyAgentDetails).name}
            </h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleIconClick("call")}
                className="text-gray-600 p-2"
              >
                <i className="fas fa-phone text-xl"></i>
              </button>
              <button
                onClick={() => handleIconClick("paint")}
                className="text-gray-600 p-2"
              >
                <i className="fas fa-palette text-xl"></i>
              </button>
              <button
                onClick={() => handleIconClick("gallery")}
                className="text-gray-600 p-2"
              >
                <i className="fas fa-photo-video text-xl"></i>
              </button>
              <button
                onClick={handleSettingsClick}
                className="text-gray-600 p-2"
              >
                <i className="fas fa-ellipsis-v text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:flex md:w-[25%] flex-col fixed h-full border-r border-gray-200">
        {/* Logo Section */}
        <Link
          to="/home"
          className="text-3xl font-bold text-[#9610FF] p-5 text-center"
        >
          {APP_NAME}
        </Link>

        {/* Sidebar Content Section - Add pb-16 to prevent content from going behind nav */}
        <div className="flex-1 overflow-y-auto px-4 w-full pb-16">
          <div className="w-full">
            {/* First Row - Two Columns */}
            <div className="flex justify-between items-center w-full mb-6 mt-4">
              {/* Left Column - Name */}
              <div className="flex-shrink-0">
                <h3 className="text-xl font-semibold">
                  {(agentDetails || dummyAgentDetails).name}
                </h3>
              </div>

              {/* Right Column - Icons */}
              <div className="flex gap-3">
                <button
                  className="p-2 text-gray-500 hover:text-[#9610FF] hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleIconClick("call")}
                >
                  <i className="fas fa-phone text-xl"></i>
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-[#9610FF] hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleIconClick("paint")}
                >
                  <i className="fas fa-palette text-xl"></i>
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-[#9610FF] hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => handleIconClick("gallery")}
                >
                  <i className="fas fa-photo-video text-xl"></i>
                </button>
                <button
                  className="p-2 text-gray-500 hover:text-[#9610FF] hover:bg-gray-100 rounded-full transition-colors"
                  onClick={handleSettingsClick}
                >
                  <i className="fas fa-cog text-xl"></i>
                </button>
              </div>
            </div>

            {/* Second Row - Full Width Image */}
            {/* src={(agentDetails || dummyAgentDetails).avatar} */}

            <div className="w-full aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="/images/local-agent-image.webp" // Update to use local image
                alt={`${(agentDetails || dummyAgentDetails).name}'s avatar`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer Navigation - Fixed at bottom of sidebar */}
        <nav className="absolute bottom-0 left-0 w-full border-t border-gray-200 bg-white py-3 px-4">
          <div className="flex justify-around items-center w-full">
            <Link
              to="/home"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/home"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-home"></i>
            </Link>
            <Link
              to="/new"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/new"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-plus"></i>
            </Link>
            <Link
              to="/chats"
              className={`flex-1 text-center text-2xl ${
                location.pathname.startsWith("/chats")
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-comments"></i>
            </Link>
            <Link
              to="/profile"
              className={`flex-1 text-center text-2xl ${
                location.pathname === "/profile"
                  ? "text-purple-600"
                  : "text-gray-400"
              } hover:text-purple-600 transition-colors`}
            >
              <i className="fas fa-user"></i>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Chat Area - Improved scrolling */}
      <div className="flex-1 flex flex-col h-screen md:ml-[25%]">
        <div className="flex-1 flex flex-col pt-16 md:pt-0 relative">
          {" "}
          {/* Add top padding for mobile header */}
          {activeContent ? (
            <div className="h-full overflow-y-auto pb-16">
              {" "}
              {/* Add bottom padding for input area */}
              <div className="sticky top-0 bg-white border-b p-4 flex items-center">
                <button
                  onClick={handleBack}
                  className="text-gray-600 hover:text-[#9610FF] mr-4"
                >
                  <i className="fas fa-arrow-left text-xl"></i>
                </button>
                <h2 className="text-lg font-semibold">{activeContent}</h2>
              </div>
              <div className="p-4">{renderDynamicContent()}</div>
            </div>
          ) : (
            <>
              {/* Messages Container with Fixed Height */}
              <div className="flex flex-col h-[calc(100vh-120px)] md:h-[calc(100vh-80px)]">
                {/* Date Header - Always Visible */}
                <div className="sticky top-0 z-10 py-2 bg-white/80 backdrop-blur">
                  <div className="text-center">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-600">
                      {formattedDate}
                    </span>
                  </div>
                </div>

                {/* Scrollable Messages Area */}
                <div className="flex-1 overflow-y-auto px-4">
                  <div className="space-y-6 py-4">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`relative group max-w-[85%] md:max-w-[70%] break-words ${
                            msg.role === "user" ? "bg-blue-50" : "bg-gray-200"
                          } rounded-2xl p-3 md:p-4`}
                          style={{
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {/* Message content */}
                          {msg.role === "assistant" &&
                          index === newMessageId ? (
                            <TypewriterMarkdown content={msg.content} />
                          ) : (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          )}

                          {/* Reactions */}
                          {msg.role === "assistant" && (
                            <div
                              className={`absolute -bottom-8 right-0 bg-white rounded-lg shadow-sm p-1 flex gap-2 transition-opacity ${
                                index === lastAssistantIndex ||
                                selectedReactions[index]
                                  ? "opacity-100"
                                  : "opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              {["👍", "👎"].map((reaction) => (
                                <button
                                  key={reaction}
                                  onClick={() =>
                                    handleReaction(index, reaction)
                                  }
                                  className={`hover:scale-110 transition-transform ${
                                    selectedReactions[index]?.includes(reaction)
                                      ? "opacity-100"
                                      : "opacity-50"
                                  }`}
                                >
                                  {reaction}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>

              {/* Fixed Input Area */}
              <div className="fixed bottom-0 left-0 right-0 md:left-[25%] bg-white border-t z-10">
                <form
                  onSubmit={handleSubmit}
                  className="p-3 md:p-4 flex items-center gap-2 max-w-full"
                >
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 text-gray-500 hover:text-[#9610FF]"
                  >
                    <i className="fas fa-image text-xl"></i>
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 text-gray-500 hover:text-[#9610FF]"
                  >
                    <i className="fas fa-microphone text-xl"></i>
                  </button>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm md:text-base focus:border-[#9610FF] focus:ring-1 focus:ring-[#9610FF] focus:outline-none"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex-shrink-0 p-2 text-[#9610FF]"
                    disabled={loading}
                  >
                    <i className="fas fa-paper-plane text-xl"></i>
                  </button>
                  <button
                    type="button"
                    className="flex-shrink-0 p-2 text-gray-500 hover:text-[#9610FF]"
                  >
                    <i className="fas fa-camera text-xl"></i>
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImagePreview(false)}
        >
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setShowImagePreview(false)}
              className="absolute -top-10 right-0 text-white text-xl"
            >
              <i className="fas fa-times"></i>
            </button>
            <img
              src="/images/local-agent-image.webp"
              alt="Agent Full Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Settings Popover - Enhanced mobile experience */}
      {showSettingsPopover && (
        <div className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:right-[78%] md:top-[calc(25%+80px)] bg-white rounded-t-xl md:rounded-lg shadow-lg z-50 transform transition-transform duration-200 ease-out">
          <button
            onClick={() => {
              handleIconClick("options");
              setShowSettingsPopover(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-purple-50 hover:text-[#9610FF] transition-colors"
          >
            Cultura Information
          </button>
          <button
            onClick={() => {
              handleIconClick("sharedNotes");
              setShowSettingsPopover(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-purple-50 hover:text-[#9610FF] transition-colors"
          >
            Shared Notes
          </button>
        </div>
      )}
    </div>
  );
};

export default Chats;
