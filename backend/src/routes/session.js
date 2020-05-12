const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const session = require("../controllers/SessionController");

const { SESSION_EXPIRATION = 10000, JWT_SECRET = "secret" } = process.env;

const decryptToken = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

router.post("/login", session.login);

router.get("/me", session.me);

router.post("/logout", session.logout);

module.exports = router;
