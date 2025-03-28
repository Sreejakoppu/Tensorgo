const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  try {
    // 1. Debug incoming headers
    // console.log("Incoming headers:", req.headers);

    // 2. Check authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No authorization header found");
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    // 3. Verify Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      // console.log("Malformed authorization header");
      return res.status(401).json({
        success: false,
        error: "Invalid token format",
      });
    }

    // 4. Extract and verify token
    const token = authHeader.split(" ")[1];
    // console.log("Extracted token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"], // Specify expected algorithm
      ignoreExpiration: false, // Enforce expiration checks
    });

    // 5. Attach user to request
    req.user = decoded;
    // console.log("Decoded user:", decoded);

    next();
  } catch (err) {
    // console.error("JWT verification error:", err.message);

    // 6. Proper error responses
    const response = {
      success: false,
      error: "Authentication failed",
    };

    if (err.name === "TokenExpiredError") {
      response.error = "Token expired";
    } else if (err.name === "JsonWebTokenError") {
      response.error = "Invalid token";
    }

    return res.status(401).json(response);
  }
};

module.exports = checkToken;
