import React from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const Progress = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual user data from your backend
  const mockUserProgress = {
    totalQuizzes: 15,
    averageScore: 78,
    totalQuestions: 150,
    correctAnswers: 117,
    recentQuizzes: [
      {
        id: 1,
        date: "2024-03-15",
        subject: "ICT",
        chapter: "Database Management",
        score: 85,
        totalQuestions: 10,
        timeSpent: "12:30"
      },
      {
        id: 2,
        date: "2024-03-14",
        subject: "ICT",
        chapter: "Programming Concepts",
        score: 75,
        totalQuestions: 10,
        timeSpent: "15:45"
      },
      // Add more quiz history
    ],
    performanceByChapter: [
      { chapter: "Information Systems", score: 85 },
      { chapter: "Database Management", score: 78 },
      { chapter: "Programming Concepts", score: 72 },
      { chapter: "Web Development", score: 80 },
      { chapter: "Computer Networks", score: 75 }
    ]
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
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Your Progress</h1>
              <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mb-4 rounded-full"></div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: "Total Quizzes",
                  value: mockUserProgress.totalQuizzes,
                  icon: "📚"
                },
                {
                  title: "Average Score",
                  value: `${mockUserProgress.averageScore}%`,
                  icon: "📊"
                },
                {
                  title: "Questions Answered",
                  value: mockUserProgress.totalQuestions,
                  icon: "❓"
                },
                {
                  title: "Correct Answers",
                  value: mockUserProgress.correctAnswers,
                  icon: "✅"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <h3 className="text-white text-lg font-semibold mb-2">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Performance by Chapter</h2>
              <div className="space-y-4">
                {mockUserProgress.performanceByChapter.map((chapter, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span>{chapter.chapter}</span>
                      <span>{chapter.score}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2.5 rounded-full"
                        style={{ width: `${chapter.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Quizzes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Quizzes</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Subject</th>
                      <th className="py-3 px-4 text-left">Chapter</th>
                      <th className="py-3 px-4 text-left">Score</th>
                      <th className="py-3 px-4 text-left">Time</th>
                      <th className="py-3 px-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUserProgress.recentQuizzes.map((quiz, index) => (
                      <tr key={index} className="border-b border-white/10">
                        <td className="py-3 px-4">{quiz.date}</td>
                        <td className="py-3 px-4">{quiz.subject}</td>
                        <td className="py-3 px-4">{quiz.chapter}</td>
                        <td className="py-3 px-4">{quiz.score}%</td>
                        <td className="py-3 px-4">{quiz.timeSpent}</td>
                        <td className="py-3 px-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
                            onClick={() => navigate(`/review/${quiz.id}`)}
                          >
                            Review
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Progress; 