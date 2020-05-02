const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const employeeController = {};

employeeController.getAll = async function (req, res) {
  try {
    const EmployeeList = await Employee.find();
    res.json({ EmployeeList });
  } catch (e) {
    res.json({});
  }
};

employeeController.getOne = async function (req, res) {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json({ employee });
};

employeeController.create = async function (req, res) {
  try {
    const result = await Employee.create(req.body);
    res.json({ result });
  } catch (e) {
    res.json({});
  }
};

employeeController.update = async function (req, res) {
  const { id } = req.params;
  const result = await Employee.findByIdAndUpdate(id, req.body);
  res.json({ result });
};

employeeController.delete = async function (req, res) {
  // TODO
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = employeeController;
