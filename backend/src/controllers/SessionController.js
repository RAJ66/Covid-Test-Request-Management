const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");

const { SESSION_EXPIRATION = 10000, JWT_SECRET = "secret" } = process.env;

const decryptToken = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

const sessionController = {};

sessionController.login = async function (req, res) {
  const user = { nif: req.body.nif, password: req.body.password };

  const userDB = await User.findOne({ nif: user.nif });

  if (userDB) {
    bcrypt.compare(user.password, userDB.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ nif: user.nif }, JWT_SECRET, {
          expiresIn: SESSION_EXPIRATION,
        });
        res.cookie("x-authentication", token, {
          expires: new Date(Date.now() + SESSION_EXPIRATION),
          secure: false, // set to true if your using https
          httpOnly: true,
        });

        res.send("login");
      } else {
        res.send("Incorrect");
      }
    });
  } else {
    res.send("User not exist");
  }
};

sessionController.me = async function (req, res) {
  try {
    const token = req.cookies["x-authentication"];
    if (token) {
      const user = await decryptToken(token);
      res.json(user);
    } else {
      res.status(401);
      res.json(null);
    }
  } catch (e) {
    console.log(e.name, e.message);
    res.json(null);
  }
};

sessionController.logout = async function (req, res) {
  res.clearCookie("x-authentication");
  res.json(null);
};

module.exports = sessionController;
