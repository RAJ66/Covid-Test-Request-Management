const mongoose = require("mongoose");
const Request = require("../models/Request");

const generateUniqueId = require("../utils/generateUniqueId");

const requestController = {};

requestController.getAll = async function (req, res) {
  try {
    const filters = {};
    if (req.query.saude24) {
      filters.saude24 = req.query.saude24;
    }
    if (req.query.riskProfession) {
      filters.riskProfession = req.query.riskProfession;
    }
    if (req.query.riskGroup) {
      filters.riskGroup = req.query.riskGroup;
    }
    if (req.query.userId) {
      filters.userId = req.query.userId;
    }
    if (req.query.userState) {
      filters.userState = req.query.userState;
    }
    if (req.query.requestState) {
      filters.requestState = req.query.requestState;
    }

    const requestList = await Request.find(filters);
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
        if (result == userInfected) {
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
  try {
    const { id } = req.params;

    const userInfected = "Infected";
    const userNotInfected = "Not Infected";

    const requestDone = "Done";
    const requestInProgress = "In Progress";

    const testResultPending = "Pending";
    const testResultPositive = "Positive";
    const testResultNegative = "Negative";

    await Request.findByIdAndUpdate(id, req.body);

    const request = await Request.findById(id);

    if (
      request.firstTestResult == testResultPending &&
      request.secondTestResult != testResultPending
    ) {
      await Request.findByIdAndUpdate(id, {
        secondTestResult: testResultPending,
      });
      res.json({});
    } else if (
      request.firstTestResult == testResultPositive ||
      request.secondTestResult == testResultPositive
    ) {
      await Request.findByIdAndUpdate(id, {
        userState: userInfected,
        requestState: requestDone,
      });
      const updatedRequest = await Request.findById(id);
      res.json({ updatedRequest });
    } else if (
      request.firstTestResult == testResultNegative &&
      request.secondTestResult == testResultNegative
    ) {
      await Request.findByIdAndUpdate(id, {
        userState: userNotInfected,
        requestState: requestDone,
      });
      const updatedRequest = await Request.findById(id);
      res.json({ updatedRequest });
    } else if (request.secondTestResult == testResultPending) {
      await Request.findByIdAndUpdate(id, {
        requestState: requestInProgress,
      });
      const updatedRequest = await Request.findById(id);
      res.json({ updatedRequest });
    }
  } catch (e) {
    res.json({});
  }
};

requestController.delete = async function (req, res) {
  const { id } = req.params;
  await Request.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = requestController;
