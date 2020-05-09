const mongoose = require("mongoose");
const moment = require("moment");

const Request = require("../models/Request");

moment.locale("pt");

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
    res.json({ err: e });
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
    res.json({ err: e });
  }
};

requestController.update = async function (req, res) {
  try {
    const { id } = req.params;

    const testDate = moment().format();

    const userInfected = "Infected";
    const userNotInfected = "Not Infected";

    const requestDone = "Done";
    const requestInProgress = "In Progress";

    const testResultPending = "Pending";
    const testResultPositive = "Positive";
    const testResultNegative = "Negative";

    await Request.findByIdAndUpdate(id, req.body);

    const request = await Request.findById(id);

    if (request.firstTestDate === undefined) {
      await Request.findByIdAndUpdate();
    }

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
      if (request.secondTestResult == testResultPending) {
        await Request.findByIdAndUpdate(id, {
          userState: userInfected,
          requestState: requestDone,
          firstTestDate: testDate,
        });

        const updatedRequest = await Request.findById(id);
        res.json({ updatedRequest });
      } else {
        const secondDateLimit = moment(request.firstTestDate)
          .add(2, "days")
          .format();
        const isValid = moment(testDate).isAfter(secondDateLimit);

        if (isValid) {
          await Request.findByIdAndUpdate(id, {
            userState: userInfected,
            requestState: requestDone,
            secondTestDate: testDate,
          });
        } else {
          await Request.findByIdAndUpdate(id, {
            secondTestResult: testResultPending,
          });
        }

        const updatedRequest = await Request.findById(id);
        res.json({ updatedRequest });
      }
    } else if (
      request.firstTestResult == testResultNegative &&
      request.secondTestResult == testResultNegative
    ) {
      const secondDateLimit = moment(request.firstTestDate)
        .add(2, "days")
        .format();
      const isValid = moment(testDate).isAfter(secondDateLimit);

      if (isValid) {
        await Request.findByIdAndUpdate(id, {
          userState: userNotInfected,
          requestState: requestDone,
          secondTestDate: testDate,
        });
      } else {
        await Request.findByIdAndUpdate(id, {
          secondTestResult: testResultPending,
        });
      }

      const updatedRequest = await Request.findById(id);
      res.json({ updatedRequest });
    } else if (request.secondTestResult == testResultPending) {
      await Request.findByIdAndUpdate(id, {
        requestState: requestInProgress,
        firstTestDate: testDate,
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
