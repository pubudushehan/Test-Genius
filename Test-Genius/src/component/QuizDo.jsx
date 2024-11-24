import React, { useState, useEffect } from "react";

const QuizPage = ({ selectedQuiz }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(0); // Time in seconds
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Fetch questions when the component loads
  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch(
        `/api/getQuestions?language=${selectedQuiz.language}&subject=${selectedQuiz.subject}&year=${selectedQuiz.year}&paperType=${selectedQuiz.paperType}`
      );
      const data = await response.json();
      setQuestions(data);
      setTimer(data.length * 60); // Example: 1 minute per question
    };

    fetchQuestions();
  }, [selectedQuiz]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !isQuizFinished) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      finishQuiz();
    }
  }, [timer, isQuizFinished]);

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  // Handle navigation
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Finish the quiz
  const finishQuiz = () => {
    setIsQuizFinished(true);
    // Evaluate score, send data to the backend if needed
  };

  // Format timer
  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
        <header className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {selectedQuiz.year} {selectedQuiz.subject} MCQ
          </h2>
          <div className="text-red-600 dark:text-red-400 font-semibold">{formatTimer()}</div>
        </header>
        <div className="mt-6">
          <p className="text-lg text-gray-900 dark:text-white">
            {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </p>
          {/* Display Image if exists */}
          {questions[currentQuestionIndex].image && (
            <img src={questions[currentQuestionIndex].image} alt="Question Illustration" className="my-4 rounded" />
          )}
          <div className="mt-4 space-y-2">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() =>
                  handleAnswerSelect(questions[currentQuestionIndex]._id, option)
                }
                className={`block w-full text-left px-4 py-2 rounded ${
                  selectedAnswers[questions[currentQuestionIndex]._id] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {index + 1}. {option}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={goToPreviousQuestion}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={goToNextQuestion}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
        <div className="mt-4 grid grid-cols-7 gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => jumpToQuestion(index)}
              className={`p-2 rounded ${
                index === currentQuestionIndex ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
