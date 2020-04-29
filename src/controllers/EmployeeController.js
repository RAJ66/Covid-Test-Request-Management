const mongoose = require("mongoose");
const Employee = require("../models/Employee");

var employeeController = {};

employeeController.list = async function (req, res) {
  // TODO
  try {
    const filters = {};
    if (req.query.salary) {
      filters.salary = {
        $gte: parseFloat(req.query.salary),
      };
    }
    if (req.query.position) {
      filters.position = req.query.position;
    }
    const employeesList = await Employee.find(filters);
    res.json({ employeesList });
    // res.render("employees", { employees: employeesList, filters: req.query });
  } catch (e) {
    res.render("employees", { employees: [] });
  }
};

employeeController.show = async function (req, res) {
  // TODO
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json({ employee });
  //res.render("employees/show", { employee });
};

employeeController.create = function (req, res) {
  //res.render("../views/employees/create");
};

employeeController.save = async function (req, res) {
  try {
    const result = await Employee.create(req.body);
    res.json({ result });
    //res.redirect(`/employees`);
  } catch (e) {
    //res.send("error");
  }
};

employeeController.edit = async function (req, res) {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  res.json({ employee });
  //res.render("employees/edit", {
  //  employee,
  //});
};

employeeController.update = async function (req, res) {
  const { id } = req.params;
  const result = await Employee.findByIdAndUpdate(id, req.body);
  res.json({ result });

  //res.redirect(`/employees/show/${result._id}`);
};

employeeController.delete = async function (req, res) {
  // TODO
  const { id } = req.params;
  await Employee.findByIdAndDelete(id);
  res.json({ delete: true });
  //res.redirect("/employees");
};

module.exports = employeeController;
