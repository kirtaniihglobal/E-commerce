const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { addOrder, getAllOrders, cancelOrder } = require("../controllers/orderController");
const { getAllOrdersAdmin, updateOrdersAdmin } = require("../controllers/adminController")



router.post("/addOrder", verifyToken, addOrder)
router.get("/getOrder", verifyToken, getAllOrders)
router.get("/getAllOrder", getAllOrdersAdmin)
router.put("/updateOrder/:id", updateOrdersAdmin)
router.put("/cancelOrder/:id", cancelOrder)







module.exports = router