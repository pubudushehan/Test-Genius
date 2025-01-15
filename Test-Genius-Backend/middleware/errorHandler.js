const errorHandler = (err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    code: err.code,
  });

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate entry error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }

  // Validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }

  // Default error
  res.status(500).json({
    message: "Something went wrong!",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

module.exports = errorHandler;
