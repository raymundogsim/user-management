// middlewares/authMiddleware.js
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { User } = require('../models')
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ message: 'Unauthorized', errors: {} });
  }

  if (!token) {
    return res.status(403).json({
      message: "No token provided!",
      erros: {}
    });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token', errors: {} });
    }

    let user = await User.findByPk(decoded.userId, { attributes: { exclude: ["password"] } });

    if (user) {
      delete user.password;
    }
    req.userId = decoded.userId;
    req.user = user;

    next();
  });
};

module.exports = authMiddleware;
