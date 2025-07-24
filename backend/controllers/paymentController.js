const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const User = require("../models/user");
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
      success_url: `${process.env.REACTBASE_URL}/success`,
      cancel_url: `${process.env.REACTBASE_URL}/checkOut`,
      metadata: { orderId: order._id.toString() },
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Error:", err);
    res.status(500).json({ msg: "Payment failed" });
  }
};

// const subscribePayment = async (req, res) => {
//   try {
//     const customerEmail = req.user.email;
//     const id = req.user.id;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       customer_email: customerEmail,
//       line_items: [
//         {
//           price: "price_1RnwBmQZ9KjLUhb4rZcV5HaG",
//           quantity: 1,
//         },
//       ],
//       metadata: { userId: id.toString() },
//       success_url: `${process.env.REACTBASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: "http://localhost:3000/subscription-cancel",
//     });

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe Session Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };
// const cancelSubscription = async (req, res) => {
//   try {
//     console.log("hello");
//     const userId = req.user.id;
//     const user = await User.findById(userId);

//     if (!user.subscriptionId) {
//       return res.status(400).json({ message: "No active subscription found." });
//     }
//     await stripe.subscriptions.cancel(user.subscriptionId);

//     user.isSubscribe = false;
//     user.subscriptionId = null;
//     await user.save();

//     res.status(200).json({ message: "Subscription cancelled successfully." });
//   } catch (error) {
//     console.error("Cancel subscription error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

module.exports = {
  payment,
  // subscribePayment,
  // cancelSubscription,
};
