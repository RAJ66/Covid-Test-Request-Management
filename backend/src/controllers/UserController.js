const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

var userController = {};

userController.getAll = async function (req, res) {
  try {
    const userList = await User.find();
    res.json({ userList });
  } catch (e) {
    res.json({});
  }
};

userController.getOne = async function (req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ user });
};

userController.create = async function (req, res) {
  try {
    const password = req.body.password;
    const passwordHash = await bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(10)
    );
    req.body.password = passwordHash;

    const result = await User.create(req.body);
    res.json({ result });
  } catch (e) {
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
