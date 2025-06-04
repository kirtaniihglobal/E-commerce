// const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct, getAllproducts, deleteProduct } = require("../controllers/productController");




router.post("/", upload.single("image"), createProduct)
router.get("/", getAllproducts)
router.delete("/:id", deleteProduct)





module.exports = router