const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz.model');

// Get all quizzes (for admin)
router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quizzes' });
  }
});

// Get quiz by filters (for quiz selection)
router.get('/select', async (req, res) => {
  try {
    const { language, subject, year, paperType } = req.query;
    
    const query = {};
    if (language) query.medium = language; // Note: frontend uses 'language', backend uses 'medium'
    if (subject) query.subject = subject;
    if (year) query.year = year;
    if (paperType) query.paperType = paperType;

    const quiz = await Quiz.findOne(query);
    
    if (!quiz) {
      return res.status(404).json({ message: 'No quiz found with the specified criteria' });
    }
    
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});

module.exports = router;