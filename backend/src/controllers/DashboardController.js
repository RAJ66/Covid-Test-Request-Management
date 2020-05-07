const mongoose = require("mongoose");
const Request = require("../models/Request");

const dashBoardController = {};

dashBoardController.list = async function (req, res) {
  try {
    const requestTotal = await Request.find().count();

    const requestTotalNeg = await Request.find({
      testResult: "Negativo",
    }).count();

    const requestTotalPos = await Request.find({
      testResult: "Positivo",
    }).count();

    const requestTotalUn = await Request.find({
      testResult: undefined,
    }).count();

    res.json({
      requestTotal,
      requestTotalNeg,
      requestTotalPos,
      requestTotalUn,
    });
  } catch (e) {
    res.json({});
  }
};

module.exports = dashBoardController;
