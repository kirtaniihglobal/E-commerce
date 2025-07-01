const User = require("../models/user");
const Order = require("../models/order");
const Product = require("../models/product");



const getAllOrdersAdmin = async (req, res) => {
    try {
        const { status } = req.query;
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

        const order = await Order.findOne({ _id: orderId }).populate("orderData.products.productId");
        const pending = order.status == "pending";
        if (pending) {
            const updateOrder = await Order.findByIdAndUpdate(orderId, { status: "delivered" }, { new: true })
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
const updateUserByAdmin = async (req, res) => {
    try {
        const userID = req.params.id;
        const updateData = {
            fullName: req.body.fullName,
            number: req.body.number,
            email: req.body.email,
            address: req.body.address,
        };
        const findUser = await User.findById(userID);
        if (!findUser) {
            return res.status(500).json({ status: false, msg: "User is not found" });
        }
        if (req.file) {
            updateData.image = req.file.path;
        }
        const updateUser = await User.findByIdAndUpdate(userID, updateData, {
            new: true,
        });
        if (!updateUser) {
            return res
                .status(400)
                .json({ status: 400, msg: "User not found" });
        }
        return res.status(200).json({
            status: 200,
            msg: "UserProfile updated successfully",
            updateUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, msg: "ProfileUpdate Failed" });
    }

}
const getAllCount = async (req, res) => {
    try {
        const users = await User.countDocuments({ role: "user" });

        const orders = await Order.countDocuments({});

        const product = await Product.countDocuments({});

        return res.status(200).json({ status: 200, msg: "fetch all users", users, orders, product })
    }
    catch (error) {
        console.error("error to fetch product", error);
        return res.status(500).json({ status: 500, msg: "error to fetch users" })
    }
}
const blockUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const checkUser = await User.findById(userId);
        if (!checkUser) {
            return res.status(500).json({ status: false, msg: "User is not found" })
        }
        const updateUser = await User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
        return res.status(200).json({ status: true, msg: "user Bloked successfully", updateUser })
    } catch (error) {
        return res.status(500).json({ status: false, msg: "User block error" })
    }
}



module.exports = {
    getAllOrdersAdmin,
    updateOrdersAdmin,
    getAllUsers,
    updateUserByAdmin,
    getAllCount,
    blockUser
}