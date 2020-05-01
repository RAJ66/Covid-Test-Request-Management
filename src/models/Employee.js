const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  nif: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
