import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Sample question data - replace with your actual questions
  const mockQuestion = {
    question: "What is the primary function of an operating system?",
    options: [
      "Managing hardware resources and providing services for computer programs",
      "Creating documents and spreadsheets",
      "Browsing the internet",
      "Playing games",
      "Running antivirus software"
    ],
    correctAnswer: 0
  };

  const handleNext = () => {
    // Add your next question logic here
  };

  const handlePrevious = () => {
    // Add your previous question logic here
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
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Quiz Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">ICT Quiz</h1>
              <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-4 rounded-full"></div>
            </div>

            {/* Quiz Card */}
            <motion.div 
              className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              
              {/* Question Content */}
              <div className="relative p-6 md:p-8">
                {/* Question Number */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/80 text-sm">Question {currentQuestion + 1} of 10</span>
                  <span className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-sm">
                    Time: 15:00
                  </span>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                    {mockQuestion.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-4">
                    {mockQuestion.options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full text-left p-4 rounded-lg transition-all duration-200 
                          bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30
                          text-white backdrop-blur-sm group"
                      >
                        <span className="inline-block w-8 h-8 mr-3 rounded-full bg-white/10 
                          text-center leading-8 text-white group-hover:bg-white/20 transition-all duration-200">
                          {String.fromCharCode(65 + index)}
                        </span>
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  {/* Previous/Next Buttons */}
                  <div className="flex gap-4 w-full md:w-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePrevious}
                      className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 
                        transition-all duration-200 backdrop-blur-sm border border-white/20"
                    >
                      Previous
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNext}
                      className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                        text-white rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      Next
                    </motion.button>
                  </div>

                  {/* Question Navigation Dots */}
                  <div className="flex flex-wrap justify-center gap-2">
                    {[...Array(10)].map((_, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center
                          transition-all duration-200 border border-white/20
                          ${index === currentQuestion
                            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white'
                            : 'bg-white/10 text-white hover:bg-white/20'
                          }`}
                      >
                        {index + 1}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 text-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/result')}
                    className="px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                      text-white rounded-lg hover:shadow-lg transition-all duration-200"
                  >
                    Submit Quiz
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Helper Text */}
            <p className="text-center text-white/60 text-sm mt-6">
              Click on an option to select your answer
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;


