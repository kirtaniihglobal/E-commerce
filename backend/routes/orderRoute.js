const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { addOrder, getAllOrders } = require("../controllers/orderController");




router.post("/addOrder", verifyToken, addOrder)
router.get("/getOrder", verifyToken, getAllOrders)







module.exports = router