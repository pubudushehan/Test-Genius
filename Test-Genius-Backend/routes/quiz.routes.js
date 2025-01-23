const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const QuizController = require("../controllers/quiz.controller");
const Quiz = require("../models/quiz.model");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/multer");

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

    const quiz = await Quiz.findOne(query);

    if (!quiz) {
      return res
        .status(404)
        .json({ message: "No quiz found with the specified criteria" });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
});

// Add question with images
router.post(
  "/:quizId/question/add",
  upload.array("images", 2),
  async (req, res) => {
    try {
      const { questionText, options, correctAnswer } = req.body;
      const uploadedImages = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "quiz-images",
          });
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }

      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });

      quiz.questions.push({
        questionText,
        options,
        correctAnswer,
        images: uploadedImages,
      });
      await quiz.save();

      res.status(201).json({ message: "Question added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Edit question with images
router.put(
  "/:quizId/question/edit/:questionId",
  upload.array("images", 2),
  async (req, res) => {
    try {
      const { questionText, options, correctAnswer } = req.body;
      const uploadedImages = [];

      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "quiz-images",
          });
          uploadedImages.push({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }

      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });

      const question = quiz.questions.id(req.params.questionId);
      if (!question)
        return res.status(404).json({ message: "Question not found" });

      question.questionText = questionText;
      question.options = options;
      question.correctAnswer = correctAnswer;

      if (uploadedImages.length > 0) question.images.push(...uploadedImages);

      await quiz.save();
      res.status(200).json({ message: "Question updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Delete question image
router.delete(
  "/:quizId/question/:questionId/image/:imageId",
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) return res.status(404).json({ message: "Quiz not found" });

      const question = quiz.questions.id(req.params.questionId);
      if (!question)
        return res.status(404).json({ message: "Question not found" });

      const image = question.images.find(
        (img) => img.public_id === req.params.imageId
      );
      if (!image) return res.status(404).json({ message: "Image not found" });

      await cloudinary.uploader.destroy(image.public_id);

      question.images = question.images.filter(
        (img) => img.public_id !== req.params.imageId
      );

      await quiz.save();
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
