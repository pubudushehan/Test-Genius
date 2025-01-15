require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('../models/quiz.model');

const sampleQuizzes = [
  {
    title: "ICT Quiz 2024",
    subject: "ICT",
    year: "2024",
    paperType: "MCQ",
    medium: "English",
    questions: [
      {
        question: "What is the main function of CPU?",
        options: [
          "Process data",
          "Store data",
          "Display data",
          "Transfer data"
        ],
        correctAnswer: "Process data"
      },
      {
        question: "Which of the following is a type of computer network?",
        options: [
          "LAN",
          "CPU",
          "ROM",
          "RAM"
        ],
        correctAnswer: "LAN"
      }
    ]
  },
  {
    title: "ICT Quiz 2024 Sinhala",
    subject: "ICT",
    year: "2024",
    paperType: "MCQ",
    medium: "සිංහල",
    questions: [
      {
        question: "CPU හි ප්‍රධාන කාර්යය කුමක්ද?",
        options: [
          "දත්ත සැකසීම",
          "දත්ත ගබඩා කිරීම",
          "දත්ත ප්‍රදර්ශනය",
          "දත්ත හුවමාරුව"
        ],
        correctAnswer: "දත්ත සැකසීම"
      }
    ]
  }
];

async function seedQuizzes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing quizzes
    await Quiz.deleteMany({});

    // Insert new quizzes
    await Quiz.insertMany(sampleQuizzes);
    console.log('Quiz data seeded successfully');

  } catch (error) {
    console.error('Error seeding quiz data:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedQuizzes(); 