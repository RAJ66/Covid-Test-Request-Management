const mongoose = require("mongoose");
const Request = require("../models/Request");

const dashBoardController = {};

dashBoardController.list = async function (req, res) {
  try {
    const requestTotal = await Request.find().count();

    const requestTotalNeg = await Request.find({
      userState: "Not Infected",
    }).count();

    const requestTotalPos = await Request.find({
      userState: "Infected",
    }).count();

    const requestTotalUn = requestTotal - requestTotalPos - requestTotalNeg;

    res.json({
      requestTotal,
      requestTotalNeg,
      requestTotalPos,
      requestTotalUn,
    });
  } catch (e) {
    res.json({ err: e });
  }
};

module.exports = dashBoardController;
