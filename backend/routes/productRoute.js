// const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createProduct, getAllproducts, getOneproduct, deleteProduct, editProduct, getNewArrivalproducts, getTopSellingproducts } = require("../controllers/productController");




router.post("/", upload.single("image"), createProduct)
router.get("/", getAllproducts)
router.get("/new", getNewArrivalproducts)
router.get("/top", getTopSellingproducts)
router.get("/:id", getOneproduct)
router.delete("/:id", deleteProduct)
router.put("/:id", upload.single("image"), editProduct)





module.exports = router