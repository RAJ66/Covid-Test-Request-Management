const express = require("express");
const router = express.Router();
const employee = require("../controllers/EmployeeController.js");

// Get all employees
router.get("/", employee.list);

// Get single employee by id
router.get("/show/:id", employee.show);

// Save employee
router.post("/save", employee.save);

// Edit employee
router.post("/update/:id", employee.update);

// Delete employee
router.post("/delete/:id", employee.delete);

module.exports = router;
