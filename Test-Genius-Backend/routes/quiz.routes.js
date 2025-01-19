const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const QuizController = require("../controllers/quiz.controller");
const Quiz = require("../models/quiz.model");
const cloudinary = require("../config/cloudinary");
const upload = require("../middleware/upload");

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

router.post(
  "/:quizId/question/add",
  upload.array("images", 2),
  async (req, res) => {
    try {
      const { questionText, options, correctAnswer } = req.body;
      const uploadedImages = [];

      // Upload images to Cloudinary if any
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "quiz-images" },
              (error, result) => {
                if (error) {
                  return reject(new Error("Cloudinary upload failed"));
                }
                uploadedImages.push({
                  url: result.secure_url,
                  public_id: result.public_id,
                });
                resolve();
              }
            );

            // Use the file buffer
            uploadStream.end(file.buffer);
          });
        }
      }

      // Create new question with images
      const question = {
        questionText,
        options,
        correctAnswer,
        images: uploadedImages,
      };

      // Save the question to the database
      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
      quiz.questions.push(question);
      await quiz.save();

      res.status(201).json({ question });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Add this route for updating questions with images
router.put(
  "/:quizId/question/edit/:questionId",
  upload.array("images", 2),
  async (req, res) => {
    try {
      const { questionText, options, correctAnswer } = req.body;
      const uploadedImages = [];

      // Upload new images to Cloudinary if any
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "quiz-images" },
              (error, result) => {
                if (error) {
                  return reject(new Error("Cloudinary upload failed"));
                }
                uploadedImages.push({
                  url: result.secure_url,
                  public_id: result.public_id,
                });
                resolve();
              }
            );
            uploadStream.end(file.buffer);
          });
        }
      }

      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const question = quiz.questions.id(req.params.questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Update question fields
      question.questionText = questionText;
      question.options = options;
      question.correctAnswer = correctAnswer;

      // Add new images to existing ones
      if (uploadedImages.length > 0) {
        question.images = [...question.images, ...uploadedImages];
      }

      await quiz.save();
      res.json({ question });
    } catch (error) {
      console.error("Error updating question:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Add this route for removing images
router.delete(
  "/:quizId/question/:questionId/image/:imageId",
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId);
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }

      const question = quiz.questions.id(req.params.questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }

      // Find the image
      const image = question.images.find(
        (img) => img.public_id === req.params.imageId
      );
      if (!image) {
        return res.status(404).json({ message: "Image not found" });
      }

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(image.public_id);

      // Remove image from question
      question.images = question.images.filter(
        (img) => img.public_id !== req.params.imageId
      );

      await quiz.save();
      res.json({ question });
    } catch (error) {
      console.error("Error removing image:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
