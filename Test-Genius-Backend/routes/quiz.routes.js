const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const QuizController = require("../controllers/quiz.controller");
const Quiz = require("../models/quiz.model");

// Admin routes
router.post("/add", adminAuth, QuizController.createQuiz);
router.put("/edit/:id", adminAuth, QuizController.updateQuiz);
router.delete("/delete/:id", adminAuth, QuizController.deleteQuiz);

// Get all quizzes (for admin)
router.get("/all", QuizController.getAllQuizzes);

// Get quiz by filters (for quiz selection)
router.get("/select", async (req, res) => {
  try {
    const { medium, subject, year, paperType } = req.query;

    const query = {};
    if (medium) query.medium = medium;
    if (subject) query.subject = subject;
    if (year) query.year = parseInt(year);
    if (paperType) query.paperType = paperType;

    console.log("Searching for quiz with query:", query);

    const quiz = await Quiz.findOne(query);

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "No quiz found with the specified criteria" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({ message: "Error fetching quiz" });
  }
});

module.exports = router;
