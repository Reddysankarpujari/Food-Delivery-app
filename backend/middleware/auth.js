const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {

  const authHeader = req.headers.authorization;

  // ✅ Check if header exists
  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided"
    });
  }

  // ✅ Check correct format (Bearer token)
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid token format"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ Use ENV variable (IMPORTANT FOR RENDER)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey"
    );

    req.user = decoded;

    next();

  } catch (err) {

    console.error("JWT Error:", err.message);

    return res.status(401).json({
      message: "Token invalid or expired"
    });
  }
}

module.exports = authMiddleware;