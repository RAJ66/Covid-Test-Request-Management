const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nif: Number,
  password: String,
  email: String,
  name: String,
  birthDate: Date,
  contact: Number,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
