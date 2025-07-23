const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const payment = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate(
      "orderData.products.productId"
    );
    if (!order) return res.status(404).json({ msg: "Order not found" });

    const line_items = order.orderData.products.map((product) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: product.productId.name,
        },
        unit_amount: product.productId.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.REACTBASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REACTBASE_URL}/checkOut`,
      metadata: { orderId: order._id.toString() },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ msg: "Payment failed" });
  }
};

module.exports = {
  payment,
};
