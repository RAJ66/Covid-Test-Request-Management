const express = require("express");
const router = express.Router();
const user = require("../controllers/UserController.js");

//Get all users
router.get("/", user.list);

//Get a single user by id
router.get("/show/:id", user.show);

//Save user
router.post("/save", user.save);

//Edit/Update user
router.post("/update/:id", user.update);

//Delete user
router.post("/delete/:id", user.delete);

module.exports = router;
