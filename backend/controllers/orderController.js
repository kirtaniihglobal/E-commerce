const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");



const addOrder = async (req, res) => {
    try {
        // console.log(address)
        const { address, pincode, city, country } = req.body;
        const id = req.user.id;
        if (!address || !pincode || !city || !country) {
            return res.status(500).json({ status: false, msg: "Please Select Address" })
        }
        const findUser = await User.findById(id);
        if (!findUser) {
            return res.status(500).json({ status: false, msg: "user not found!" });
        }
        // console.log(findUser)
        const cart = await Cart.findOne({ userId: id });
        // console.log(cart.total)
        if (!cart) {
            return res.status(500).json({ status: false, msg: "cart not found!" });
        }
        const finalPrice = cart.total - (cart.total / 100) * 20;
        // const order = await Order.findOne({ userId: id })
        if (cart.products == "") {
            return res.status(500).json({ status: false, msg: "cart is empty" })
        } else {
            const newOrder = new Order({
                userId: id,
                orderData: { products: cart.products },
                total: finalPrice,
                info: [{ country: country, address: address, pincode: pincode, city: city }],
                status: "pending",
            });
            console.log("newOrder", newOrder)
            await newOrder.save();
            cart.products = [];
            cart.total = 0;
            await cart.save();
            return res.status(201).json({ status: true, message: "order created and product added", newOrder, cart });
        }
    } catch (error) {
        return res.status(500).json({ status: false, msg: "order error" });
    }

}

const getAllOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        const orders = await Order.find({ userId: userId, status: { $in: ["pending", "delivered", "canceled"] } }).populate("orderData.products.productId");
        return res.status(200).json({
            status: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ status: false, msg: "Failed to fetch orders", error: error.message });
    }
};
const cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        console.log("hello", orderId)

        const order = await Order.findOne({ _id: orderId }).populate("orderData.products.productId");
        console.log("order", order)
        const pending = order.status == "pending";

        if (pending) {
            const updateOrder = await Order.findByIdAndUpdate(orderId, { status: "canceled" }, { new: true })
            console.log(updateOrder)
            return res.status(200).json({ status: true, msg: "order canceled", updateOrder })
        } else {
            return res.status(500).json({ status: false, msg: "Order not Canceled" })
        }
    } catch (error) {
        console.error("Error cancel order:", error);
        return res.status(500).json({ status: false, msg: "Failed to cancel order", error: error.message });
    }
};



module.exports = {
    addOrder,
    getAllOrders,
    cancelOrder
}