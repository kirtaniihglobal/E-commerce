const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  addressData: [
    {
      address: String,
      city: String,
      pincode: Number,
      country: String,
      state: String,
      default: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Address", addressSchema);
