const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Get the token from the authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Extract token from Bearer token format
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      console.log("Token verification:", { token, decoded, error: err });

      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token has expired",
            code: "TOKEN_EXPIRED",
          });
        }
        if (err.name === "JsonWebTokenError") {
          return res.status(403).json({
            message: "Invalid token",
            code: "INVALID_TOKEN",
          });
        }
        return res.status(403).json({
          message: "Failed to authenticate token",
          error: err.message,
        });
      }

      // Check if the user has 'admin' role
      if (!decoded || decoded.role !== "admin") {
        return res.status(403).json({
          message: "Access denied - Admin privileges required",
          code: "NOT_ADMIN",
        });
      }

      // Attach the decoded data to the request object
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
