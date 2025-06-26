const express = require("express");
const router = express.Router();
const { verifyToken, checkBlockUser } = require("../middleware/auth")
const { addOrder, getAllOrders, cancelOrder } = require("../controllers/orderController");



router.post("/addOrder", verifyToken, checkBlockUser, addOrder)
router.get("/getOrder", verifyToken, getAllOrders)

router.put("/cancelOrder/:id", verifyToken, checkBlockUser, cancelOrder)







module.exports = router