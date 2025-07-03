const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  number: String,
  email: { type: String, required: true, unique: true },
  password: String,
  confirmPassword: String,
  role: { type: String, enum: ["admin", "user"] },
  address: String,
  image: String,
  isBlocked: { type: Boolean, default: false },
  resetToken: String,
});

module.exports = mongoose.model("User", userSchema);
