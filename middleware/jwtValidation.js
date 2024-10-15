
const jwt = require("jsonwebtoken");
require("dotenv").config();

// JWT validation middleware
const jwtValidationMiddleware = (req, res, next) => {
  // Skip validation for the auth service route
  if (req.originalUrl.includes('/auth')) {
    return next();
  }

  // Extract JWT token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'Forbidden: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden: Invalid token'});
    req.user = decoded.email;
    next();
  });
};

module.exports = jwtValidationMiddleware;