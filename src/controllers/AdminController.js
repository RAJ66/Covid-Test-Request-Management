const mongoose = require("mongoose");
const Admin = require("../models/Admin");

const adminController = {};

adminController.list = async function (req, res) {
  try {
    const AdminList = await Admin.find();
    res.json({ AdminList });
  } catch (e) {
    res.json({});
  }
};

adminController.show = async function (req, res) {
  const { id } = req.params;
  const admin = await Admin.findById(id);
  res.json({ admin });
};

adminController.save = async function (req, res) {
  try {
    const result = await Admin.create(req.body);
    res.json({ result });
  } catch (e) {
    res.json({});
  }
};

adminController.update = async function (req, res) {
  const { id } = req.params;
  const result = await Admin.findByIdAndUpdate(id, req.body);
  res.json({ result });
};

adminController.delete = async function (req, res) {
  const { id } = req.params;
  await Admin.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = adminController;
