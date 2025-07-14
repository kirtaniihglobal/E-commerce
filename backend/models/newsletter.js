const mongoose = require("mongoose");

const sletterSchema = new mongoose.Schema(
  {
    email: { type: String},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sletter", sletterSchema);
