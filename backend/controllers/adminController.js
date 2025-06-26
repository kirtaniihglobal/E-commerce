const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");




const getAllOrdersAdmin = async (req, res) => {
    try {
        const { status } = req.query;
        console.log("HELLO", req.query)
        const query = status ? { status } : {};

        const orders = await Order.find(query).populate("orderData.products.productId userId");

        return res.status(200).json({
            status: true,
            message: "Orders fetched successfully",
            orders
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ status: false, msg: "Failed to fetch orders", error: error.message });
    }
};
const updateOrdersAdmin = async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log("hello", orderId)

        const order = await Order.findOne({ _id: orderId }).populate("orderData.products.productId");
        console.log("order", order)
        const pending = order.status == "pending";
        if (pending) {
            const updateOrder = await Order.findByIdAndUpdate(orderId, { status: "delivered" }, { new: true })
            console.log(updateOrder)
            return res.status(200).json({ status: true, msg: "order updated", updateOrder })


        } else {
            return res.status(500).json({ status: false, msg: "Order not Update" })
        }

    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ status: false, msg: "Failed to fetch orders", error: error.message });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: "user" });
        return res.status(200).json({ status: 200, msg: "fetch all users", users })
    }
    catch (error) {
        console.error("error to fetch product", error);
        return res.status(500).json({ status: 500, msg: "error to fetch users" })
    }
}



module.exports = {
    getAllOrdersAdmin,
    updateOrdersAdmin,
    getAllUsers
}