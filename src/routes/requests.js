const express = require("express");
const router = express.Router();
const request = require("../controllers/RequestController.js");

//Get all requests
router.get("/requests", request.list);

//Save request
router.post("/requests", request.save);

//Get a single request by id
router.get("/request/:requestId", request.show);

//Edit/Update request
router.put("/request/:requestId", request.update);

//Delete request
router.delete("/request/:requestId", request.delete);

module.exports = router;
