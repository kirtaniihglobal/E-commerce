const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    stock: Number,
    rating: Number,
    size: Array,
    color: Array
});

module.exports = mongoose.model("Product", productSchema);
