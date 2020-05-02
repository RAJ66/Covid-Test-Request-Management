const express = require("express");
const router = express.Router();
const request = require("../controllers/RequestController.js");

//Get all requests
router.get("/requests", request.list);

//Save request
router.post("/requests", request.save);

//Get a single request by id
router.get("/request/:id", request.show);

//Edit/Update request
router.put("/request/:id", request.update);

//Delete request
router.delete("/request/:id", request.delete);

module.exports = router;
