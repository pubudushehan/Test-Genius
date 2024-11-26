import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { score, answers, totalQuestions = 10 } = location.state || {};

  const correctCount = score || 0;
  const incorrectCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: 'A+', color: 'text-emerald-400' };
    if (percentage >= 80) return { grade: 'A', color: 'text-emerald-400' };
    if (percentage >= 70) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400' };
    if (percentage >= 50) return { grade: 'S', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-red-400' };
  };

  const { grade, color } = getGrade(percentage);

  const handleReAttempt = () => {
    navigate('/quiz');
  };

  const handleNewQuiz = () => {
    navigate('/selectquiz');
  };

  const handleReviewWrong = () => {
    navigate('/review', { state: { answers } });
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
        <div className="container mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Result Card */}
            <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative p-6 md:p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Quiz Results</h2>
                  <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-4 rounded-full"></div>
                  <p className="text-gray-200">Your performance summary</p>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="relative w-48 h-48 flex items-center justify-center"
                  >
                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200/20"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-purple-500"
                        strokeWidth="10"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (percentage / 100) * 251.2}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                    </svg>
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${color}`}>{percentage}%</div>
                      <div className={`text-xl ${color}`}>Grade: {grade}</div>
                    </div>
                  </motion.div>
                </div>

                {/* Statistics Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-emerald-500/10 backdrop-blur-sm p-6 rounded-xl border border-emerald-500/20"
                  >
                    <div className="text-emerald-300 text-lg font-semibold mb-2">Correct Answers</div>
                    <div className="text-3xl font-bold text-emerald-400">{correctCount} / {totalQuestions}</div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-red-500/10 backdrop-blur-sm p-6 rounded-xl border border-red-500/20"
                  >
                    <div className="text-red-300 text-lg font-semibold mb-2">Incorrect Answers</div>
                    <div className="text-3xl font-bold text-red-400">{incorrectCount} / {totalQuestions}</div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-3 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReAttempt}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 
                      transition-all duration-200 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retry Quiz
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNewQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 
                      text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Quiz
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReviewWrong}
                    className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 
                      transition-all duration-200 backdrop-blur-sm border border-white/20 flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Review
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Result;
