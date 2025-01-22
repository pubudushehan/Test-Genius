import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to format text with stars as bold
  const formatMessage = (text) => {
    // Split the text by double stars for bold formatting
    const parts = text.split(/\*\*/);
    return parts.map((part, index) => {
      // Even indices are normal text, odd indices are bold
      return index % 2 === 0 ? (
        part
      ) : (
        <strong key={index} className="font-bold">
          {part}
        </strong>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      // Add user message to chat
      setChatHistory((prev) => [...prev, { type: "user", content: message }]);

      // Send message to backend
      const response = await axios.post("http://localhost:5000/api/chat", {
        message,
      });

      // Add AI response to chat
      setChatHistory((prev) => [
        ...prev,
        { type: "ai", content: response.data.reply },
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      setChatHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full pt-4 px-2 sm:px-4"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto py-4 sm:py-8">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                Test
              </span>
              <span className="text-white mx-1">|</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
                Genius
              </span>
            </h2>
            <p className="text-white/80 text-center mt-2 sm:mt-4 text-sm sm:text-base">
              Ask me anything about technology, programming, or general
              knowledge
            </p>
          </div>

          {/* Chat Messages */}
          <div className="h-[60vh] overflow-y-auto p-3 sm:p-6 space-y-4">
            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  chat.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl backdrop-blur-sm
                    ${
                      chat.type === "user"
                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border border-white/30"
                        : chat.type === "error"
                        ? "bg-red-50/90 text-red-600 border border-red-200"
                        : "bg-white/80 text-gray-800 border border-white/50"
                    } shadow-lg`}
                >
                  <div className="whitespace-pre-wrap text-sm sm:text-base">
                    {formatMessage(chat.content)}
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white/80 p-3 sm:p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-white/50">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-6 bg-white/5 backdrop-blur-md border-t border-white/10"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-3 sm:p-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 border border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition-colors text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-xl 
                  hover:from-violet-600 hover:to-fuchsia-600 transition-all duration-200 
                  disabled:from-violet-400 disabled:to-fuchsia-400 disabled:cursor-not-allowed
                  shadow-lg hover:shadow-xl active:scale-95 transform
                  border border-white/20 text-sm sm:text-base whitespace-nowrap"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
