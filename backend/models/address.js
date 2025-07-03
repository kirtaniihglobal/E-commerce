const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    addressData: [{
        address: String,
        city: String,
        pincode: Number,
        country: String
    }]
});

module.exports = mongoose.model("Address", addressSchema);
