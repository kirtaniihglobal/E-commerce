const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderData: {
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
                quantity: { type: Number, default: 1 },
                size: String,
                color: String,
                
            },
        ],
    },
    total: Number,
    info: [
        {
            address: String,
            pincode: Number,
            city: String,
            country: String
        }
    ],
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered", "canceled"], default: "pending" },
    paymentDetail: {
        paymentMode: String
    },
    
});

module.exports = mongoose.model("Order", orderSchema);

