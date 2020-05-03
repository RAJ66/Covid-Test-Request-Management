const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController.js");

//Get all users
router.get("/users", user.getAll);

//Get a single user by id
router.get("/user/:id", user.getOne);

//Save user
router.post("/users", user.create);

//Edit/Update user
router.put("/user/:id", user.update);

//Delete user
router.delete("/user/:id", user.delete);

module.exports = router;
