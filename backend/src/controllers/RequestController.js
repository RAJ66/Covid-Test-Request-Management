const mongoose = require("mongoose");
const moment = require("moment");

const Request = require("../models/Request");
const User = require("../models/User");

const generateUniqueId = require("../utils/generateUniqueId");
const sendEmail = require("../utils/sendEmail");

function sendDate(user, date) {
  sendEmail(
    user.email,
    "Request Date",
    `Caro ${user.name} seu teste ficou marcado para dia ${date}.`
  );
}

function sendResult(user, result) {
  sendEmail(
    user.email,
    "Result Request",
    `Caro ${user.name} era para informar que o resultado do seu teste foi ${result}.`
  );
}

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
    if (req.query.employeeNif) {
      const employee = await User.findOne({ nif: req.query.employeeNif });
      filters.employeeId = employee._id;
    }

    const requestList = await Request.find(filters);
    res.json({ requestList });
  } catch (e) {
    res.status(500);
    res.json({ err: e });
  }
};

requestController.getOne = async function (req, res) {
  try {
    const { id } = req.params;
    const request = await Request.findOne({ id: id });
    res.json({ request });
  } catch (e) {
    res.status(404);
    res.json({ err: e });
  }
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
    res.status(500);
    res.json({ err: e });
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

    const save = {};
    let updated = false;
    const old = await Request.findById(id).populate("userId");
    console.log(old.userId);

    if (old.requestState == requestDone || old.userState == userInfected) {
      updated = true;
    }

    //meter primeira data
    if (!updated && !old.firstTestDate && req.body.firstTestDate) {
      save.firstTestDate = req.body.firstTestDate;
      const updatedRequest = await Request.findByIdAndUpdate(id, save);
      updated = true;
      sendDate(old.userId, req.body.firstTestDate);
      res.json({ updatedRequest });
    }
    //meter primeiro resultado
    if (
      !updated &&
      old.firstTestResult == testResultPending &&
      req.body.firstTestResult &&
      old.firstTestDate
    ) {
      updated = true;
      save.firstTestResult = req.body.firstTestResult;
      sendResult(old.userId, req.body.firstTestResult);

      //Se o primeiro resultado for positivo
      if (save.firstTestResult == testResultPositive) {
        save.userState = userInfected;
        save.requestState = requestDone;
        const updatedRequest = await Request.findByIdAndUpdate(id, save);
        //sendDate(old.us,)
        res.json({ updatedRequest });
      } else {
        //Se o primeiro resultado for negativo
        //Colocar segunda data automaticamente
        const secondDate = moment(old.firstTestDate).add(2, "days").format();

        save.secondTestDate = secondDate;
        save.requestState = requestInProgress;
        const updatedRequest = await Request.findByIdAndUpdate(id, save);
        sendDate(old.userId, secondDate);
        res.json({ updatedRequest });
      }
    }
    //meter segundo resultado
    if (
      !updated &&
      old.secondTestResult == testResultPending &&
      req.body.secondTestResult &&
      old.firstTestResult !== testResultPending
    ) {
      save.secondTestResult = req.body.secondTestResult;
      save.requestState = requestDone;

      sendResult(old.userId, req.body.secondTestResult);
      //se o segundo resultado for positivo
      if (save.secondTestResult == testResultPositive) {
        save.userState = userInfected;
        const updatedRequest = await Request.findByIdAndUpdate(id, save);
        res.json({ updatedRequest });
      } else {
        save.userState = userNotInfected;
        const updatedRequest = await Request.findByIdAndUpdate(id, save);
        res.json({ updatedRequest });
      }
    } else {
      // IMPORTANT FIX
      //res.status(500);
      //res.json({ err: "Somehting went wrong with the request." });
    }
  } catch (e) {
    // IMPORTANT FIX
    // res.status(500);
    // res.json({ err: e });
  }
};

requestController.delete = async function (req, res) {
  const { id } = req.params;

  const request = await Request.findById(id);

  if (request) {
    await Request.findByIdAndDelete(id);
    res.json({ delete: true });
  } else {
    res.status(404);
    res.json({ delete: false });
  }
};

requestController.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const response = await Request.findByIdAndUpdate(id, {
      file: filename,
    });
    res.json(response);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

module.exports = requestController;
