const express = require("express");
const router = express.Router();
const request = require("../controllers/RequestController.js");

//Get all requests
router.get("/requests", request.getAll);

//Save request
router.post("/requests", request.create);

//Get a single request by id
router.get("/request/:id", request.getOne);

//Edit/Update request
router.put("/request/:id", request.update);

//Delete request
router.delete("/request/:id", request.delete);

module.exports = router;
