import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './NavBar';

const Select = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPaperType, setSelectedPaperType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStartQuiz = async () => {
    if (selectedLanguage && selectedSubject && selectedYear && selectedPaperType) {
      setLoading(true);
      setError("");
      
      try {
        const response = await fetch(
          `/api/quiz/select?language=${selectedLanguage}&subject=${selectedSubject}&year=${selectedYear}&paperType=${selectedPaperType}`
        );
        
        if (!response.ok) {
          throw new Error('Quiz not found');
        }
        
        const quizData = await response.json();
        navigate('/quiz', { state: { quiz: quizData } });
      } catch (error) {
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select all options before starting the quiz.");
    }
  };

  return (
    <div>
      <NavBar showlogin={false} />
      <div 
        className="min-h-screen w-full pt-16"
        style={{
          background: `linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%)`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Select Quiz Options
              </h2>

              {/* Medium Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Medium</h3>
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLanguage("English")}
                    className={`p-4 rounded-xl text-white text-center transition-all duration-200 ${
                      selectedLanguage === "English"
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    English
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedLanguage("Sinhala")}
                    className={`p-4 rounded-xl text-white text-center transition-all duration-200 ${
                      selectedLanguage === "Sinhala"
                        ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    සිංහල
                  </motion.button>
                </div>
              </div>

              {/* Subject Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Subject</h3>
                <select 
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Select Subject</option>
                  <option value="ICT">ICT</option>
                </select>
              </div>

              {/* Year Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Year</h3>
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* Paper Type Selection */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Paper Type</h3>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPaperType("MCQ")}
                  className={`w-full p-4 rounded-xl text-white text-center transition-all duration-200 ${
                    selectedPaperType === "MCQ"
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  MCQ
                </motion.button>
              </div>

              {error && (
                <div className="text-red-300 text-center mb-6">
                  {error}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartQuiz}
                disabled={loading}
                className="w-full p-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl 
                  hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Start Quiz'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Select;