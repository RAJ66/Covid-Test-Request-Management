const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", AdminSchema);
