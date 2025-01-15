const Quiz = require('../models/quiz.model');
const mongoose = require('mongoose');
require('dotenv').config();

const sampleQuizzes = [
    {
      language: "english",
      subject: "ICT",
      year: "2024",
      paperType: "MCQ",
      questions: [
        {
          question: "What is the primary function of an operating system?",
          options: [
            "Managing hardware resources and providing services for computer programs",
            "Creating documents and spreadsheets",
            "Browsing the internet",
            "Playing games"
          ],
          correctAnswer: 0
        },
        {
          question: "Which of the following is not a type of computer network?",
          options: [
            "LAN",
            "WAN",
            "TAN",
            "MAN"
          ],
          correctAnswer: 2
        },
        // Add more questions here
        {
          question: "What does CPU stand for?",
          options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Performance Unit",
            "Computer Processing Unit"
          ],
          correctAnswer: 0
        },
        {
          question: "What is RAM?",
          options: [
            "Random Access Memory",
            "Read Access Memory",
            "Run Access Memory",
            "Random Application Memory"
          ],
          correctAnswer: 0
        }
      ]
    }
  ];

const seedQuizzes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Quiz.deleteMany({});
    console.log('Cleared existing quizzes');

    await Quiz.insertMany(sampleQuizzes);
    console.log('Sample quizzes created successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding quizzes:', error);
    process.exit(1);
  }
};

seedQuizzes();