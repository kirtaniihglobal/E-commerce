const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
});

module.exports = mongoose.model("Rating", ratingSchema);