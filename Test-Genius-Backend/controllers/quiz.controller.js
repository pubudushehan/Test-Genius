const Quiz = require("../models/quiz.model");

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quiz by filters
exports.getQuizByFilters = async (req, res) => {
  try {
    const { medium, subject, year, paperType } = req.query;

    const query = {
      medium,
      subject,
      year: parseInt(year),
      paperType,
    };

    const quiz = await Quiz.findOne(query);
    if (!quiz) {
      return res.status(404).json({
        message: "No quiz found matching the selected criteria",
      });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

// Create new quiz
exports.createQuiz = async (req, res) => {
  try {
    // Validate required fields
    const { title, medium, year, subject, paperType, timePeriod, questions } =
      req.body;

    if (
      !title ||
      !medium ||
      !year ||
      !subject ||
      !paperType ||
      !timePeriod ||
      !questions
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate questions format
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Quiz must have at least one question" });
    }

    // Log the request body to check the data being sent
    console.log("Creating quiz with data:", {
      title,
      medium,
      year,
      subject,
      paperType,
      timePeriod,
      questionCount: questions.length,
      questions: questions,
    });

    const quiz = new Quiz(req.body);
    const newQuiz = await quiz.save();

    // Log the saved quiz to verify questions were saved
    console.log("Saved quiz:", newQuiz);

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    // Validate required fields
    const { title, medium, year, subject, paperType, timePeriod, questions } =
      req.body;

    // Log the received data for debugging
    console.log("Updating quiz with data:", req.body);

    // Validate all required fields
    if (
      !title ||
      !medium ||
      !year ||
      !subject ||
      !paperType ||
      !timePeriod ||
      !questions
    ) {
      return res.status(400).json({
        message: "All fields are required",
        received: {
          title,
          medium,
          year,
          subject,
          paperType,
          timePeriod,
          questionCount: questions?.length,
        },
      });
    }

    // Validate questions format
    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ message: "Quiz must have at least one question" });
    }

    // Validate question format
    const isValidQuestions = questions.every(
      (question) =>
        question.questionText &&
        Array.isArray(question.options) &&
        question.options.length > 0 &&
        question.correctAnswer
    );

    if (!isValidQuestions) {
      return res.status(400).json({
        message:
          "Invalid question format. Each question must have questionText, options, and correctAnswer",
      });
    }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Update the quiz with the new data
    quiz.title = title;
    quiz.medium = medium;
    quiz.year = year;
    quiz.subject = subject;
    quiz.paperType = paperType;
    quiz.timePeriod = timePeriod;
    quiz.questions = questions;
    quiz.updatedAt = Date.now();

    const updatedQuiz = await quiz.save();
    console.log("Quiz updated successfully:", updatedQuiz);
    res.json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(400).json({
      message: error.message,
      details: error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : undefined,
    });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await Quiz.findByIdAndDelete(req.params.id);
    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: error.message });
  }
};

// Add question to quiz
exports.addQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.questions.push(req.body);
    quiz.updatedAt = Date.now();
    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update question
exports.updateQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const question = quiz.questions.id(req.params.questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    Object.assign(question, req.body);
    quiz.updatedAt = Date.now();
    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete question
exports.deleteQuestion = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    quiz.questions.pull(req.params.questionId);
    quiz.updatedAt = Date.now();
    const updatedQuiz = await quiz.save();
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
