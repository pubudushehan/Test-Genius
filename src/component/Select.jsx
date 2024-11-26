import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TestGenius = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");

  const handleStartQuiz = () => {
    if (selectedLanguage && selectedSubject && selectedYear && selectedPaperType) {
      navigate('/quiz');
    }
  };

  return (
    <div 
      className="min-h-screen w-full"
      style={{
        background: `
          linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%),
          url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80') center/cover no-repeat
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="pt-16 md:pt-20 pb-8 px-4 min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-xl md:max-w-2xl"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-[1.5rem] blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl"></div>

          {/* Main card */}
          <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-4 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Select Your Quiz
                </h2>
                <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-4 rounded-full"></div>
                <p className="text-base md:text-lg text-gray-200">
                  Customize your quiz experience
                </p>
              </div>

              {/* Form */}
              <div className="space-y-4 md:space-y-6">
                {/* Language Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1 md:mb-2">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white text-sm md:text-base"
                  >
                    <option value="" className="bg-gray-800">Select Language</option>
                    <option value="sinhala" className="bg-gray-800">Sinhala</option>
                    <option value="english" className="bg-gray-800">English</option>
                  </select>
                </div>

                {/* Subject Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1 md:mb-2">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white text-sm md:text-base"
                  >
                    <option value="" className="bg-gray-800">Select Subject</option>
                    <option value="ict" className="bg-gray-800">ICT</option>
                    <option value="sft" className="bg-gray-800">SFT</option>
                    <option value="et" className="bg-gray-800">ET</option>
                    <option value="bst" className="bg-gray-800">BST</option>
                  </select>
                </div>

                {/* Year Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1 md:mb-2">
                    Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white text-sm md:text-base"
                  >
                    <option value="" className="bg-gray-800">Select Year</option>
                    {[...Array(14)].map((_, index) => (
                      <option key={index} value={2011 + index} className="bg-gray-800">
                        {2011 + index}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Paper Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-1 md:mb-2">
                    Paper Type
                  </label>
                  <select
                    value={selectedPaperType}
                    onChange={(e) => setSelectedPaperType(e.target.value)}
                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500/50 outline-none transition-all duration-200 text-white text-sm md:text-base"
                  >
                    <option value="" className="bg-gray-800">Select Paper Type</option>
                    <option value="model" className="bg-gray-800">Model Paper</option>
                    <option value="past" className="bg-gray-800">Past Paper</option>
                  </select>
                </div>

                {/* Start Button */}
                <motion.button
                  onClick={handleStartQuiz}
                  disabled={!selectedLanguage || !selectedSubject || !selectedYear || !selectedPaperType}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 md:py-4 px-4 md:px-6 rounded-lg font-medium shadow-lg transition-all duration-200 text-sm md:text-base mt-6
                    ${selectedLanguage && selectedSubject && selectedYear && selectedPaperType
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:shadow-xl'
                      : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                    }`}
                >
                  Start Quiz
                </motion.button>

                {/* Helper Text */}
                <p className="text-center text-gray-300 text-xs md:text-sm mt-4">
                  Select all options to start your quiz
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestGenius;
