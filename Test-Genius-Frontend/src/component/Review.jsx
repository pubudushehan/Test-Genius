import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers = [] } = location.state || {};

  const handleBackToResults = () => {
    navigate(-1); // Go back to results page
  };

  return (
    <div>
      <NavBar showlogin={false} />
      <div
        className="min-h-screen w-full pt-16"
        style={{
          background: `
            linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
            url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
          `,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Quiz Review
              </h2>
              <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-4 rounded-full"></div>
              <p className="text-gray-200">
                Review your answers question by question
              </p>
            </div>

            {/* Questions Review */}
            <div className="space-y-6">
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Question {index + 1}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        answer.isCorrect
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {answer.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  {/* Question Text */}
                  <p className="text-white/90 mb-4 text-lg">
                    {answer.question}
                  </p>

                  {/* Answer Status */}
                  <div className="space-y-3">
                    {/* User's Answer */}
                    <div className="flex items-center space-x-3">
                      <span className="text-white/60">Your Answer:</span>
                      <span
                        className={`px-4 py-2 rounded-lg ${
                          answer.isCorrect
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {answer.userAnswer || "No answer provided"}
                      </span>
                    </div>

                    {/* Correct Answer - only show if user was wrong */}
                    {!answer.isCorrect && (
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60">Correct Answer:</span>
                        <span className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {answer.correctAnswer}
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToResults}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 
                  transition-all duration-200 backdrop-blur-sm border border-white/20"
              >
                Back to Results
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Review;
