const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const generatePassCrypt = require("../utils/crypt");
const sendEmail = require("../utils/sendEmail");

function sendRegistro(user) {
  sendEmail(
    user.email,
    "Create User",
    `Caro ${user.name} seu registro foi criado com sucesso.`
  );
}

const userController = {};

userController.getAll = async function (req, res) {
  try {
    const filters = {};

    if (req.query.role) {
      filters.role = req.query.role;
    }
    if (req.query.nif) {
      filters.nif = req.query.nif;
    }

    const userList = await User.find(filters);
    res.json({ userList });
  } catch (e) {
    res.status(500);
    res.json({ err: e });
  }
};

userController.getOne = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({ user });
  } catch (e) {
    res.status(404);
    res.json({ err: e });
  }
};

userController.create = async function (req, res) {
  try {
    const userDB = await User.findOne({ nif: req.body.nif });

    if (userDB) {
      res.status(403);
      res.json({ err: "User exist" });
    } else {
      const passwordHash = await generatePassCrypt(req.body.password);
      req.body.password = passwordHash;

      const result = await User.create(req.body);

      sendRegistro(req.body);
      res.json({ result });
    }
  } catch (e) {
    res.status(500);
    res.json({ err: e });
  }
};

userController.update = async function (req, res) {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    const oldUser = await User.findById(id);
    const oldPassword = oldUser.password;

    if (req.body.newPassword && req.body.oldPassword) {
      bcrypt.compare(req.body.oldPassword, oldPassword, async function (
        err,
        result
      ) {
        if (result) {
          const passwordHash = await generatePassCrypt(req.body.newPassword);
          const result = await User.findByIdAndUpdate(id, {
            password: passwordHash,
          });
          res.json({ result });
        } else {
          res.status(401);
          res.json({ err: "Password incorrect" });
        }
      });
    } else {
      const result = await User.findByIdAndUpdate(id, req.body);
      res.json({ result });
    }
  } else {
    res.status(404);
    res.json({});
  }
};

userController.delete = async function (req, res) {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    await User.findByIdAndDelete(id);
    res.json({ delete: true });
  } else {
    res.status(404);
    res.json({ delete: false });
  }
};

module.exports = userController;
