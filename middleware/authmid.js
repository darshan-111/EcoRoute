const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Middleware to authenticate JWT tokens and protect dashboard route
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Token is not valid' });

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Authorization header missing or invalid' });
  }
};

module.exports = authenticateJWT;
