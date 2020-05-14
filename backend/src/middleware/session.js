const jwt = require("jsonwebtoken");

const { JWT_SECRET = "this is for development" } = process.env;

const sessionMiddleware = (req, res, next) => {
  const sessionStr = req.cookies["x-authentication"];

  try {
    if (sessionStr) {
      const user = jwt.verify(sessionStr, JWT_SECRET);
      req.user = user;
    } else {
      req.user = null;
    }
  } catch (e) {
    console.error(e);
    req.user = null;
  }
  next();
};

module.exports = sessionMiddleware;
