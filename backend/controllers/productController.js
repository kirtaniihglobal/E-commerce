const Product = require("../models/product");



const createProduct = async (req, res) => {
    try {

        const { name, price, description, stock, size, color } = req.body;
        if (!name || !price || !stock || !size || !color) {
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
            image,
            size,
            color
        })
        await newProduct.save();
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
const getOneproduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // console.log(product)
        return res.status(200).json({ status: 200, msg: "one product selected", product });
    } catch (error) {
        console.log("product error", error);
        return res.status(500).json({ status: 500, msg: "product fetch errorr" });
    }
}
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({ status: 200, msg: "delete successfully" })
    } catch (error) {
        console.error("delete error", error);
        return res.status(500).json({ status: 500, msg: "delete error" })
    }
}
const editProduct = async (req, res) => {
    try {
        const updateData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            size: req.body.size,
            color: req.body.color,
        };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        });

        if (!product) {
            return res
                .status(400)
                .json({ status: 400, msg: "Product not found" });
        }

        return res.status(200).json({
            status: 200,
            msg: "Product updated successfully",
            product,
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ msg: "Update failed" });
    }
};



module.exports = {
    createProduct,
    getAllproducts,
    getOneproduct,
    deleteProduct,
    editProduct
}