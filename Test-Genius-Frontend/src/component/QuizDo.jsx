import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NavBar from "./NavBar";
import { apiConfig } from "../config/apiConfig";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [startTime] = useState(Date.now());

  const quiz = location.state?.quiz;

  useEffect(() => {
    if (!quiz) {
      navigate("/selectquiz");
    }
  }, [quiz, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    const answers = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      answers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswers[index],
        isCorrect,
      });

      if (selectedAnswers[index] !== undefined) {
        if (isCorrect) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      } else {
        incorrectAnswers++;
      }
    });

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const user = JSON.parse(localStorage.getItem("user"));

    // Save progress to backend
    if (user) {
      try {
        const response = await fetch(
          `${apiConfig.baseURL}/api/users/${user.uid}/quiz-attempt`,
          {
            method: "POST",
            headers: {
              ...apiConfig.headers,
            },
            credentials: "include",
            body: JSON.stringify({
              quizId: quiz._id,
              subject: quiz.subject,
              chapter: quiz.chapter,
              score: correctAnswers,
              totalQuestions: quiz.questions.length,
              timeSpent: formatTime(timeSpent),
              answers,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save quiz progress");
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    }

    navigate("/result", {
      state: {
        score: correctAnswers,
        incorrectCount: incorrectAnswers,
        totalQuestions: quiz.questions.length,
        timeSpent,
        answeredQuestions: selectedAnswers.filter(
          (answer) => answer !== undefined
        ).length,
        userAnswers: selectedAnswers,
        questions: quiz.questions,
      },
    });
  };

  if (!quiz) return null;

  const question = quiz.questions[currentQuestion];

  return (
    <div>
      <NavBar showlogin={false} />
      <div
        className="min-h-screen w-full pt-16"
        style={{
          background: `linear-gradient(135deg, rgba(124, 58, 237, 0.95) 0%, rgba(219, 39, 119, 0.85) 100%)`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Quiz Header */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
              <div className="flex justify-between items-center text-white">
                <div className="text-2xl font-bold">
                  Question {currentQuestion + 1}/{quiz.questions.length}
                </div>
                <div className="text-xl font-semibold">
                  Time Left: {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Question Navigation Buttons */}
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 mb-6">
              {quiz.questions.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentQuestion(index)}
                  className={`
                    p-3 rounded-xl font-semibold transition-all duration-200
                    ${
                      currentQuestion === index
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
                        : selectedAnswers[index] !== undefined
                        ? "bg-emerald-500/50 text-white hover:bg-emerald-500/70"
                        : "bg-white/10 text-white/70 hover:bg-white/20"
                    }
                    hover:shadow-lg
                  `}
                >
                  {index + 1}
                </motion.button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Question {currentQuestion + 1}:
                </h2>
                <p className="text-xl text-white">{question.questionText}</p>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === index
                        ? "bg-violet-600 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    <span className="inline-block w-8 font-semibold">
                      {index + 1}.
                    </span>
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-white/10 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all duration-200"
                >
                  Previous
                </motion.button>

                {currentQuestion === quiz.questions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Submit Quiz
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Next
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
