const mongoose = require("mongoose");
const Request = require("../models/Request");

const generateUniqueId = require("../utils/generateUniqueId");

const requestController = {};

requestController.getAll = async function (req, res) {
  try {
    const requestList = await Request.find();
    res.json({ requestList });
  } catch (e) {
    res.json({});
  }
};

requestController.getOne = async function (req, res) {
  const { id } = req.params;
  const request = await Request.findById(id);
  res.json({ request });
};

requestController.create = async function (req, res) {
  try {
    const requestId = generateUniqueId();

    const userInfected = "Infected";
    const userSuspect = "Suspect";

    let previousUserStates = [];
    let infectedCount = 0;

    const allRequests = await Request.find();

    allRequests.map((request) => {
      if (request.userId == req.body.userId) {
        previousUserStates.push(request.userState);
      }
    });

    if (allRequests.length == 0) {
      const result = await Request.create({
        id: requestId,
        userState: userSuspect,
        ...req.body,
      });
      res.json({ result });
    } else {
      previousUserStates.map((result) => {
        if (result == "Infected") {
          infectedCount++;
        }
      });

      if (infectedCount === 0) {
        const result = await Request.create({
          id: requestId,
          userState: userSuspect,
          ...req.body,
        });

        res.json({ result });
      } else {
        const result = await Request.create({
          id: requestId,
          userState: userInfected,
          ...req.body,
        });

        res.json({ result });
      }
    }
  } catch (e) {
    res.json({});
  }
};

requestController.update = async function (req, res) {
  const { id } = req.params;

  const userInfected = "Infected";
  const userNotInfected = "Not Infected";
  const testCanceled = "Canceled";

  await Request.findByIdAndUpdate(id, req.body);

  const request = await Request.findById(id);

  if (request.testResult1 == "Positive" || request.testResult2 == "Positive") {
    await Request.findByIdAndUpdate(id, {
      userState: userInfected,
      testState2: testCanceled,
      testResult2: testCanceled,
    });
    const updatedRequest = await Request.findById(id);
    res.json({ updatedRequest });
  } else if (
    request.testResult1 == "Negative" &&
    request.testResult2 == "Negative"
  ) {
    await Request.findByIdAndUpdate(id, {
      userState: userNotInfected,
    });
    const updatedRequest = await Request.findById(id);
    res.json({ updatedRequest });
  } else {
    res.json({ request });
  }
};

requestController.delete = async function (req, res) {
  const { id } = req.params;
  await Request.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = requestController;
