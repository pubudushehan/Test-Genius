import { useState, useEffect } from "react";
import NavBar from "../component/NavBar";

const Admin = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    title: "",
    medium: "",
    year: "",
    subject: "",
    paperType: "",
    timePeriod: 60,
    questions: [],
  });
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", "", ""],
    correctAnswer: "",
  });
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch("/api/quiz/all");
      if (!response.ok) throw new Error("Failed to fetch quizzes");
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format");
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    console.log("Add New Quiz button clicked");
    setShowAddModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz({ ...newQuiz, [name]: value });
  };

  const handleAddQuestion = () => {
    if (
      !currentQuestion.questionText ||
      currentQuestion.options.some((opt) => !opt) ||
      !currentQuestion.correctAnswer
    ) {
      setError("Please fill all question fields");
      return;
    }

    setNewQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...currentQuestion }],
    }));

    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", "", ""],
      correctAnswer: "",
    });
    setShowQuestionModal(false);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const handleAddQuiz = async () => {
    try {
      if (
        !newQuiz.title ||
        !newQuiz.medium ||
        !newQuiz.year ||
        !newQuiz.subject ||
        !newQuiz.paperType ||
        !newQuiz.timePeriod ||
        newQuiz.questions.length === 0
      ) {
        setError("Please fill all fields and add at least one question");
        return;
      }

      console.log("Sending quiz data:", newQuiz);

      const token = localStorage.getItem("token");
      const response = await fetch("/api/quiz/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...newQuiz,
          year: parseInt(newQuiz.year),
        }),
      });

      if (!response.ok) throw new Error("Failed to create quiz");

      const createdQuiz = await response.json();
      console.log("Created quiz:", createdQuiz);

      setQuizzes([...quizzes, createdQuiz]);
      setShowAddModal(false);
      setNewQuiz({
        title: "",
        medium: "",
        year: "",
        subject: "",
        paperType: "",
        timePeriod: 60,
        questions: [],
      });
    } catch (err) {
      setError(err.message);
      console.error("Error creating quiz:", err);
    }
  };

  const handleEdit = (quiz) => {
    setNewQuiz({
      ...quiz,
      year: quiz.year.toString(),
      questions: quiz.questions || [],
    });
    setIsEditing(true);
    setShowAddModal(true);
    setEditingQuizId(quiz._id);
  };

  const handleUpdateQuiz = async () => {
    try {
      if (
        !newQuiz.title ||
        !newQuiz.medium ||
        !newQuiz.year ||
        !newQuiz.subject ||
        !newQuiz.paperType ||
        !newQuiz.timePeriod ||
        newQuiz.questions.length === 0
      ) {
        setError("Please fill all fields and add at least one question");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`/api/quiz/edit/${editingQuizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...newQuiz,
          year: parseInt(newQuiz.year),
        }),
      });

      if (!response.ok) throw new Error("Failed to update quiz");

      const updatedQuiz = await response.json();

      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((q) => (q._id === editingQuizId ? updatedQuiz : q))
      );

      setShowAddModal(false);
      setIsEditing(false);
      setEditingQuizId(null);
      setNewQuiz({
        title: "",
        medium: "",
        year: "",
        subject: "",
        paperType: "",
        timePeriod: 60,
        questions: [],
      });
    } catch (err) {
      setError(err.message);
      console.error("Error updating quiz:", err);
    }
  };

  const handleRemoveQuestion = (indexToRemove) => {
    setNewQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const token = localStorage.getItem("token"); // Get the auth token
        const response = await fetch(`/api/quiz/delete/${quizId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete quiz");
        }

        // Remove the deleted quiz from the state
        setQuizzes((prevQuizzes) =>
          prevQuizzes.filter((quiz) => quiz._id !== quizId)
        );
      } catch (err) {
        setError(err.message);
        console.error("Error deleting quiz:", err);
      }
    }
  };

  const QuestionsList = () => (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">
        Added Questions ({newQuiz.questions.length})
      </h3>
      <div className="space-y-2">
        {newQuiz.questions.map((q, idx) => (
          <div
            key={idx}
            className="p-2 bg-gray-50 rounded flex justify-between items-start"
          >
            <div>
              <p className="font-medium">
                {idx + 1}. {q.questionText}
              </p>
              <div className="ml-4">
                {q.options.map((opt, optIdx) => (
                  <p
                    key={optIdx}
                    className={opt === q.correctAnswer ? "text-green-600" : ""}
                  >
                    {String.fromCharCode(65 + optIdx)}. {opt}
                  </p>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleRemoveQuestion(idx)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-100 pt-16">
        <NavBar showlogin={false} />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-100 pt-16">
        <NavBar showlogin={false} />
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        </div>
      </div>
    );

  return (
    <div>
      <NavBar showlogin={false} />
      <div className="min-h-screen bg-gray-100 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Quiz Management
            </h1>
            <button
              onClick={handleAddNew}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add New Quiz
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(quizzes) &&
              quizzes.map((quiz) => (
                <div
                  key={quiz._id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {quiz.subject}
                      </h2>
                      <p className="text-gray-600">
                        {quiz.language} - {quiz.year}
                      </p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {quiz.paperType}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-600">
                      {quiz.questions?.length || 0} questions
                    </span>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(quiz)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(quiz._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Quiz Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-y-auto">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl m-4">
            <h2 className="text-2xl font-bold mb-4">Add New Quiz</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={newQuiz.title}
                onChange={handleInputChange}
                placeholder="Quiz Title"
                className="w-full p-2 border rounded"
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  name="medium"
                  value={newQuiz.medium}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Medium</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="English">English</option>
                </select>

                <select
                  name="subject"
                  value={newQuiz.subject}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Subject</option>
                  <option value="ICT">ICT</option>
                  <option value="BST">BST</option>
                  <option value="ESFT">ESFT</option>
                  <option value="ET">ET</option>
                </select>

                <input
                  type="number"
                  name="year"
                  min="2011"
                  max="2024"
                  value={newQuiz.year}
                  onChange={handleInputChange}
                  placeholder="Year"
                  className="w-full p-2 border rounded"
                />

                <select
                  name="paperType"
                  value={newQuiz.paperType}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Paper Type</option>
                  <option value="Pastpaper">Past Paper</option>
                  <option value="Model">Model Paper</option>
                </select>

                <input
                  type="number"
                  name="timePeriod"
                  min="1"
                  value={newQuiz.timePeriod}
                  onChange={handleInputChange}
                  placeholder="Time Period (minutes)"
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                onClick={() => setShowQuestionModal(true)}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Question
              </button>

              <QuestionsList />

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={isEditing ? handleUpdateQuiz : handleAddQuiz}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  {isEditing ? "Update Quiz" : "Save Quiz"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Add Question</h3>
            <div className="space-y-4">
              <textarea
                value={currentQuestion.questionText}
                onChange={(e) =>
                  setCurrentQuestion((prev) => ({
                    ...prev,
                    questionText: e.target.value,
                  }))
                }
                placeholder="Question Text"
                className="w-full p-2 border rounded"
                rows="3"
              />

              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === option}
                    onChange={() =>
                      setCurrentQuestion((prev) => ({
                        ...prev,
                        correctAnswer: option,
                      }))
                    }
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowQuestionModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Question
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
