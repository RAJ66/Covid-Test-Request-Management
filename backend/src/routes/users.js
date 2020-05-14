const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController.js");
const authorize = require("../middleware/authorize");

//Get all users
router.get("/users", authorize(["Admin", "Employee"]), user.getAll);

//Get a single user by id
router.get("/user/:id", authorize(["Admin", "Employee", "User"]), user.getOne);

//Save user
router.post("/users", user.create);

//Edit/Update user
router.put("/user/:id", authorize(["Admin", "Employee", "User"]), user.update);

//Delete user
router.delete(
  "/user/:id",
  authorize(["Admin", "Employee", "User"]),
  user.delete
);

module.exports = router;
