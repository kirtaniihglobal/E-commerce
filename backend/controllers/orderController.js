const User = require("../models/user");
const Cart = require("../models/cart");
const Order = require("../models/order");
const nodemailer = require("nodemailer");

const addOrder = async (req, res) => {
  try {
    const { address, pincode, city, country } = req.body;
    const id = req.user.id;
    if (!address || !pincode || !city || !country) {
      return res
        .status(500)
        .json({ status: false, msg: "Please Select Address" });
    }
    const findUser = await User.findById(id);
    if (!findUser) {
      return res.status(500).json({ status: false, msg: "user not found!" });
    }

    const cart = await Cart.findOne({ userId: id }).populate(
      "products.productId"
    );

    if (!cart) {
      return res.status(500).json({ status: false, msg: "cart not found!" });
    }
    if (cart.products == "") {
      return res.status(500).json({ status: false, msg: "cart is empty" });
    } else {
      const newOrder = new Order({
        userId: id,
        orderData: { products: cart.products },
        total: cart.total,
        info: [
          { country: country, address: address, pincode: pincode, city: city },
        ],
        status: "pending",
      });

      await newOrder.save();
      const productList = newOrder.orderData.products
        .map((product) => {
          return `
      <div style="padding: 10px; border: 1px solid #ddd; margin-bottom: 10px;">
        <p><strong>${product?.productId?.name}</strong></p>
        <p>Quantity: <strong>${product?.quantity}</strong></p>
        <p>Size: <strong>${product?.size}</strong></p>
        <p>Color: <strong>${product?.color}</strong></p>
        <p>Price: <strong>₹${product?.productId?.price}</strong></p>
      </div>
    `;
        })
        .join("");

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.sendMail({
        to: findUser.email,
        subject: "Your Order Detail",
        html: `    <div>
      <div>
        <h2>🧾 Thank you for your order, ${findUser.fullName}!</h2>
        <p>Order placed on: <strong>${new Date().toLocaleDateString()}</strong></p>
        <p><strong>Shipping to:</strong> ${address}, ${city}, ${pincode}, ${country}</p>
        <hr/>
        ${productList}
        <hr/>
        <p><strong>Total:</strong> ₹${cart.total}</p>
        <p>Your Order Status is:<h1 style="color:orange;">${
          newOrder.status
        }</h1></p>

        <p>We’ll notify you once your items are shipped.</p>
        <p>Thank you for shopping with us!</p>
        <div>
          This is an automated email. Please do not reply.
        </div>
      </div>
    </div>`,
      });
      cart.products = [];
      cart.total = 0;
      await cart.save();
      return res.status(201).json({
        status: true,
        message: "order created and product added",
        newOrder,
        cart,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: false, msg: "order error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    const orders = await Order.find({
      userId: userId,
      status: { $in: ["pending", "delivered", "canceled"] },
    }).populate("orderData.products.productId");
    return res.status(200).json({
      status: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to fetch orders",
      error: error.message,
    });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const order = await Order.findOne({ _id: orderId }).populate(
      "orderData.products.productId userId"
    );
    console.log(order);
    const pending = order.status == "pending";
    const productList = order.orderData.products
      .map((product) => {
        return `
      <div style="padding: 10px; border: 1px solid #ddd; margin-bottom: 10px;">
        <p><strong>${product?.productId?.name}</strong></p>
        <p>Quantity: <strong>${product?.quantity}</strong></p>
        <p>Size: <strong>${product?.size}</strong></p>
        <p>Color: <strong>${product?.color}</strong></p>
        <p>Price: <strong>₹${product?.productId?.price}</strong></p>
      </div>
    `;
      })
      .join("");

    if (pending) {
      const updateOrder = await Order.findByIdAndUpdate(
        orderId,
        { status: "canceled" },
        { new: true }
      );
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      await transporter.sendMail({
        to: order.userId.email,
        subject: "Your Order Detail",
        html: `
  <div style="font-family: Arial, sans-serif;">
    <h2>🧾 Your order is Canceled, ${order.userId.fullName}!</h2>
    <hr/>
    ${productList}
    <hr/>
    <p><strong>Total:</strong> ₹${order.total}</p>
    <p>Your Order Status is: <h1 style="color:red; font-weight: bold;">${updateOrder.status}</h1></p>
    <p>We’ll notify you once your order is processed.</p>
    <p>Thank you for shopping with us!</p>
  </div>
`,
      });
      return res
        .status(200)
        .json({ status: true, msg: "order canceled", updateOrder });
    } else {
      return res.status(500).json({ status: false, msg: "Order not Canceled" });
    }
  } catch (error) {
    console.error("Error cancel order:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to cancel order",
      error: error.message,
    });
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  cancelOrder,
};
