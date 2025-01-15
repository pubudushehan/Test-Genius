const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Register route
router.post("/register", async (req, res) => {
  try {
    console.log("Registration request body:", req.body); // Debug log

    const { firstName, lastName, email, password } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password) {
      console.log("Missing required fields"); // Debug log
      return res.status(400).json({
        message: "All fields are required",
        details: {
          firstName: !firstName,
          lastName: !lastName,
          email: !email,
          password: !password,
        },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email); // Debug log
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check if user already exists - with detailed logging
    console.log("Checking for existing user with email:", email.toLowerCase());
    const existingUser = await User.findOne({ email: email.toLowerCase() }); // Convert to lowercase
    console.log("Existing user check result:", existingUser);

    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Create new user - normalize email to lowercase
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(), // Store email in lowercase
      password,
    });

    console.log("Attempting to save user:", {
      firstName,
      lastName,
      email: user.email,
    });

    await user.save();
    console.log("User saved successfully with ID:", user._id);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "fallback_secret",
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error details:", {
      error: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name,
    });

    // Handle specific MongoDB errors
    if (error.code === 11000) {
      console.log("Duplicate key error:", error.keyValue);
      return res.status(400).json({
        message: "Email already exists",
        details: error.keyValue,
      });
    }

    // Handle validation errors
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: Object.values(error.errors).map((err) => err.message),
      });
    }

    res.status(500).json({
      message: "Error registering user",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Add this new route for Google authentication
router.post("/google-auth", async (req, res) => {
  try {
    const { email, firstName, lastName, googleId } = req.body;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with Google data
      user = new User({
        firstName,
        lastName,
        email,
        password: googleId, // Use googleId as password for Google users
        googleId,
      });
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(500).json({ message: "Error with Google authentication" });
  }
});

module.exports = router;
