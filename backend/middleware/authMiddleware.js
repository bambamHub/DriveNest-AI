const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // ✅ Extract token safely
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // ❌ Empty token after split
    if (!token || token === "null") {
      return res.status(401).json({
        success: false,
        message: "Token missing or invalid",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ❌ Invalid payload
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    // ✅ Attach user
    req.user = decoded;

    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);

    return res.status(401).json({
      success: false,
      message: "Token expired or invalid",
    });
  }
};