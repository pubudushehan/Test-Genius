require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const quizRoutes = require("./routes/quiz.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
