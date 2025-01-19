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
  const [questionImages, setQuestionImages] = useState([]);
  const [editingQuestionId, setEditingQuestionId] = useState(null);

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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + questionImages.length > 2) {
      setError("Maximum 2 images allowed");
      return;
    }
    setQuestionImages((prev) => [...prev, ...files]);
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

      // Create a properly formatted quiz object
      const quizData = {
        title: newQuiz.title,
        medium: newQuiz.medium,
        year: parseInt(newQuiz.year),
        subject: newQuiz.subject,
        paperType: newQuiz.paperType,
        timePeriod: parseInt(newQuiz.timePeriod),
        questions: newQuiz.questions.map((question) => ({
          questionText: question.questionText,
          options: question.options,
          correctAnswer: question.correctAnswer,
          images: question.images || [],
        })),
      };

      const token = localStorage.getItem("token");
      const response = await fetch(`/api/quiz/edit/${editingQuizId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(quizData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update quiz");
      }

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

  const handleEditQuestion = (question) => {
    setCurrentQuestion({
      questionText: question.questionText,
      options: question.options,
      correctAnswer: question.correctAnswer,
    });
    if (question.images && question.images.length > 0) {
      setQuestionImages(question.images);
    } else {
      setQuestionImages([]);
    }
    setEditingQuestionId(question._id);
    setShowQuestionModal(true);
  };

  const handleRemoveImage = async (imageId, questionId) => {
    try {
      const response = await fetch(
        `/api/quiz/${newQuiz._id}/question/${questionId}/image/${imageId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove image");
      }

      const updatedQuiz = await response.json();
      setNewQuiz((prev) => ({
        ...prev,
        questions: prev.questions.map((q) =>
          q._id === questionId ? updatedQuiz.question : q
        ),
      }));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion((prev) => ({
      ...prev,
      options: newOptions,
    }));
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
            <div className="flex-grow">
              <p className="font-medium whitespace-pre-line">
                {idx + 1}. {q.questionText}
              </p>
              <div className="ml-4">
                {q.options.map((opt, optIdx) => (
                  <p
                    key={optIdx}
                    className={opt === q.correctAnswer ? "text-green-600" : ""}
                  >
                    {optIdx + 1}. {opt}
                  </p>
                ))}
              </div>
              {q.images && q.images.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {q.images.map((image, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={image.url}
                      alt={`Question ${idx + 1} Image ${imgIdx + 1}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditQuestion(q)}
                className="text-blue-500 hover:text-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleRemoveQuestion(idx)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
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
    <div className="relative">
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg w-full max-w-4xl my-8">
              {" "}
              {/* Changed from max-w-2xl to max-w-4xl */}
              <div className="max-h-[calc(100vh-8rem)] overflow-y-auto p-8">
                {" "}
                {/* Increased padding from p-6 to p-8 */}
                <h2 className="text-2xl font-bold mb-6">
                  {isEditing ? "Edit Quiz" : "Add New Quiz"}
                </h2>
                <div className="space-y-6">
                  {" "}
                  {/* Increased spacing from space-y-4 */}
                  <input
                    type="text"
                    name="title"
                    value={newQuiz.title}
                    onChange={handleInputChange}
                    placeholder="Quiz Title"
                    className="w-full p-3 border rounded" /* Increased padding */
                  />
                  <div className="grid grid-cols-2 gap-6">
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
                  <div className="flex justify-end space-x-2 pt-4">
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
          </div>
        </div>
      )}

      {/* Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50"></div>
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg w-full max-w-md my-8">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  {currentQuestion.editIndex !== undefined
                    ? "Edit Question"
                    : "Add Question"}
                </h3>
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
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
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

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Upload Images (Optional, max 2)
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                    />
                    {questionImages.length > 0 && (
                      <div className="mt-2 flex gap-2">
                        {questionImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={
                                image instanceof File
                                  ? URL.createObjectURL(image)
                                  : image.url
                              }
                              alt={`Preview ${index + 1}`}
                              className="h-20 w-20 object-cover rounded"
                            />
                            <button
                              onClick={() => {
                                setQuestionImages((prev) =>
                                  prev.filter((_, i) => i !== index)
                                );
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

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
                      {currentQuestion.editIndex !== undefined
                        ? "Update Question"
                        : "Add Question"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
