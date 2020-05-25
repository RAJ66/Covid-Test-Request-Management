const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

var userController = {};

userController.getAll = async function (req, res) {
  try {
    const filters = {};

    if (req.query.role) {
      filters.role = req.query.role;
    }

    const userList = await User.find(filters);
    res.json({ userList });
  } catch (e) {
    res.json({});
  }
};

userController.getOne = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({ user });
  } catch (e) {
    res.status(404);
  }
};

userController.create = async function (req, res) {
  try {
    const userDB = await User.findOne({ nif: req.body.nif });

    if (userDB) {
      res.status(403);
      res.json({});
    } else {
      const password = req.body.password;
      const passwordHash = await bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(10)
      );
      req.body.password = passwordHash;

      const result = await User.create(req.body);
      res.json({ result });
    }
  } catch (e) {
    res.status(500);
    res.json({});
  }
};

userController.update = async function (req, res) {
  const { id } = req.params;
  const result = await User.findByIdAndUpdate(id, req.body);
  res.json({ result });
};

userController.delete = async function (req, res) {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = userController;
