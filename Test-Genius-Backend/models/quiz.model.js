const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    enum: ["Sinhala", "English"],
    required: true,
  },
  year: {
    type: Number,
    min: 2011,
    max: 2024,
    required: true,
  },
  subject: {
    type: String,
    enum: ["ICT", "BST", "ESFT", "ET"],
    required: true,
  },
  paperType: {
    type: String,
    enum: ["Pastpaper", "Model"],
    required: true,
  },
  timePeriod: {
    type: Number,
    required: true,
    min: 1,
  },
  questions: [questionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
