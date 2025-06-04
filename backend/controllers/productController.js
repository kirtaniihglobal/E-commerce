const Product = require("../models/product");



const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        console.log(req.body);
        if (!name || !price || !description || !stock) {
            return res.status(400).json({ msg: "All fields are required", status: 400 });
        }
        if (!req.file) {
            return res.status(500).json({ msg: "image is required", status: 500 })
        } else {
            image = req.file.path
        }
        const newProduct = new Product({
            name,
            price,
            description,
            stock,
            image
        })
        await newProduct.save();
        console.log(newProduct);
        return res.status(201).json({ status: 201, msg: "product add successfully", product: newProduct })
    }
    catch (error) {
        console.error("add Product Error:", error);
        return res.status(500).json({ status: 500, msg: "add Product Failed" })
    }
}

const getAllproducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ status: 200, msg: "fetch all products", products })
    }
    catch (error) {
        console.error("error to fetch product", error);
        return res.status(500).json({ status: 500, msg: "error to fetch product" })
    }
}
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.parmas.id);
        return res.status(200).json({ status: 200, msg: "delete successfully" })
    }
    catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "delete error" })
    }
}



module.exports = {
    createProduct,
    getAllproducts,
    deleteProduct
}