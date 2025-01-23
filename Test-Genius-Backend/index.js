require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const quizRoutes = require("./routes/quiz.routes");
const authRoutes = require("./routes/auth.routes");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Routes
app.use("/api/quiz", quizRoutes);
app.use("/api/auth", authRoutes);

// Error handling
app.use(errorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("MongoDB connection URL:", process.env.MONGODB_URI);
  })
  .catch((error) => {
    console.error("MongoDB connection error details:", error);
    process.exit(1);
  });

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      error: "Gemini API key is not configured",
      details: "Please set GEMINI_API_KEY in your environment variables",
    });
  }

  try {
    // Initialize the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content directly without chat history
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", {
      message: error.message,
      details: error.details,
      stack: error.stack,
    });

    // Send a more user-friendly error message
    res.status(500).json({
      error: "Failed to get AI response",
      details: "There was an error processing your request. Please try again.",
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
