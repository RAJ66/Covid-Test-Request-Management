const express = require("express");
const router = express.Router();
const request = require("../controllers/RequestController.js");
const authorize = require("../middleware/authorize");

//Get all requests
router.get(
  "/requests",
  authorize(["Admin", "Employee", "User"]),
  request.getAll
);

//Save request
router.post("/requests", authorize(["User"]), request.create);

//Get a single request by id
router.get(
  "/request/:id",
  authorize(["Admin", "Employee", "User"]),
  request.getOne
);

//Edit/Update request
router.put("/request/:id", authorize(["Admin", "Employee"]), request.update);

//Delete request
router.delete("/request/:id", authorize(["Admin", "Employee"]), request.delete);

module.exports = router;
