const mongoose = require("mongoose");
const User = require("../models/User");

var userController = {};

userController.list = async function (req, res) {
  try {
    const userList = await User.find();
    res.json({ userList });
  } catch (e) {
    res.json({});
  }
};

userController.show = async function (req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({ user });
};

userController.save = async function (req, res) {
  try {
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
