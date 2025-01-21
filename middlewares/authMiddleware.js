const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token provided" });

    const formattedToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET);

    req.user = {id: decoded.id};
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticate;
