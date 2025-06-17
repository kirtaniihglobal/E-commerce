
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { createCart, getAllCart, removeFromCart, clearCart, plusProduct, minusProduct } = require("../controllers/cartController");




router.post("/add", verifyToken, createCart)
router.get("/get", verifyToken, getAllCart)
router.delete("/delete/:id", verifyToken, removeFromCart)
router.delete("/clear/", verifyToken, clearCart)
router.get("/plus/:id", verifyToken, plusProduct)
router.get("/minus/:id", verifyToken, minusProduct)






module.exports = router