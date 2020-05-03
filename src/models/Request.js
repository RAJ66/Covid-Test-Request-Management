const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  id: String,
  relevantInformation: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  testState: String,
  testResult: String,
  file: String,
});

module.exports = mongoose.model("Request", RequestSchema);
