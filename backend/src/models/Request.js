const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  id: String,
  saude24: { type: Boolean, required: true },
  riskGroup: { type: Boolean, required: true },
  riskProfession: { type: Boolean, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: undefined,
  },
  firstTestResult: { type: String, default: "Pending" },
  firstTestDate: Date,
  secondTestResult: { type: String, default: "Pending" },
  secondTestDate: Date,
  requestState: { type: String, default: "Pending" },
  userState: String,
  file: { type: String, default: undefined },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
