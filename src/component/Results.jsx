import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from './NavBar';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    score, 
    incorrectCount,
    totalQuestions, 
    timeSpent,
    answeredQuestions,
    userAnswers,
    questions
  } = location.state || {};

  if (!questions) {
    navigate('/selectquiz');
    return null;
  }

  const percentage = Math.round((score / totalQuestions) * 100);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getGrade = (percentage) => {
    if (percentage >= 75) return { grade: 'A', color: 'text-emerald-400' };
    if (percentage >= 65) return { grade: 'B', color: 'text-blue-400' };
    if (percentage >= 55) return { grade: 'C', color: 'text-yellow-400' };
    if (percentage >= 45) return { grade: 'S', color: 'text-orange-400' };
    return { grade: 'F', color: 'text-red-400' };
  };

  const { grade, color } = getGrade(percentage);

  const getAnswerStyle = (questionIndex, optionIndex) => {
    const isUserAnswer = userAnswers[questionIndex] === optionIndex;
    const isCorrectAnswer = questions[questionIndex].correctAnswer === optionIndex;

    if (isCorrectAnswer && isUserAnswer) {
      return "bg-emerald-500/20 border-emerald-500/30 text-emerald-300";
    }
    if (isUserAnswer && !isCorrectAnswer) {
      return "bg-red-500/20 border-red-500/30 text-red-300";
    }
    if (isCorrectAnswer) {
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-300";
    }
    return "bg-white/5 border-white/10 text-white/70";
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
            className="max-w-4xl mx-auto"
          >
            {/* Results Summary Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
              <h1 className="text-3xl font-bold text-white text-center mb-8">Quiz Results</h1>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-2 ${color}`}>
                    {grade}
                  </div>
                  <div className="text-white/70">Grade</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {percentage}%
                  </div>
                  <div className="text-white/70">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl font-bold text-white mb-2">
                    {formatTime(timeSpent)}
                  </div>
                  <div className="text-white/70">Time Taken</div>
                </div>
              </div>
            </div>

            {/* Questions Review */}
            <div className="space-y-6">
              {questions.map((question, qIndex) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: qIndex * 0.1 }}
                  key={qIndex}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Question {qIndex + 1}: {question.question}
                    </h3>
                    <span className={`px-4 py-1 rounded-full text-sm ${
                      userAnswers[qIndex] === question.correctAnswer
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {userAnswers[qIndex] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {question.options.map((option, oIndex) => (
                      <div
                        key={oIndex}
                        className={`p-4 border rounded-xl transition-all duration-200 ${getAnswerStyle(qIndex, oIndex)}`}
                      >
                        {option}
                        {question.correctAnswer === oIndex && (
                          <span className="ml-2 text-emerald-300">✓ Correct Answer</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/selectquiz')}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Try Another Quiz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-200"
              >
                Back to Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Results;