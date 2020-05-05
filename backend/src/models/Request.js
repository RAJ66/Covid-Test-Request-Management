const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  id: String,
  saude24: { type: String, default: "Não" },
  riscGroup: { type: String, default: "Não" },
  riscProfession: { type: String, default: "Não" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: undefined,
  },
  testState1: { type: String, default: "Pending" },
  testResult1: { type: String, default: "Pending" },
  testState2: { type: String, default: "Pending" },
  testResult2: { type: String, default: "Pending" },
  userState: String,
  file: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Request", RequestSchema);
