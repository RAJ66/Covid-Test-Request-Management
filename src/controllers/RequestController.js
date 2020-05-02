const mongoose = require("mongoose");
const Request = require("../models/Request");

const generateUniqueId = require("../utils/generateUniqueId");

const requestController = {};

requestController.list = async function (req, res) {
  try {
    const requestList = await Request.find();
    res.json({ requestList });
  } catch (e) {
    res.json({});
  }
};

requestController.show = async function (req, res) {
  const { id } = req.params;
  const request = await Request.findById(id);
  res.json({ request });
};

requestController.save = async function (req, res) {
  try {
    const requestId = generateUniqueId();
    const result = await Request.create({ id: requestId, ...req.body });
    res.json({ result });
  } catch (e) {
    res.json({});
  }
};

requestController.update = async function (req, res) {
  const { id } = req.params;
  const result = await Request.findByIdAndUpdate(id, req.body);
  res.json({ result });
};

requestController.delete = async function (req, res) {
  const { id } = req.params;
  await Request.findByIdAndDelete(id);
  res.json({ delete: true });
};

module.exports = requestController;
