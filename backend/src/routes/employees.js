const express = require("express");
const router = express.Router();
const employee = require("../controllers/EmployeeController.js");

// Get all employees
router.get("/employees", employee.getAll);

// Get single employee by id
router.get("/employee/:id", employee.getOne);

// Save employee
router.post("/employees", employee.create);

// Edit employee
router.put("/employee/:id", employee.update);

// Delete employee
router.delete("/employee/:id", employee.delete);

module.exports = router;
