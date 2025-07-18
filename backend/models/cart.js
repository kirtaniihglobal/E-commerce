const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, default: 1 },
            size: String,
            color: String
        },
    ],
    total: { type: Number, default: 0 }
});

module.exports = mongoose.model("Cart", cartSchema);

