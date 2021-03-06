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
        const token = jwt.sign(
          { nif: user.nif, role: userDB.role },
          JWT_SECRET,
          {
            expiresIn: SESSION_EXPIRATION,
          }
        );
        res.cookie("x-authentication", token, {
          expires: new Date(Date.now() + SESSION_EXPIRATION),
          secure: false, // set to true if your using https
          httpOnly: true,
        });

        const userLogged = { nif: userDB.nif, role: userDB.role };

        res.json({ userLogged });
      } else {
        res.status(401);
        res.send("Incorrect User or Password");
      }
    });
  } else {
    res.status(404);
    res.send("User not exist");
  }
};

sessionController.me = async function (req, res) {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.status(401);
      res.json(null);
    }
  } catch (e) {
    console.log(e.name, e.message);
    res.status(500);
    res.json(null);
  }
};

sessionController.logout = async function (req, res) {
  res.clearCookie("x-authentication");
  res.json(null);
};

module.exports = sessionController;
