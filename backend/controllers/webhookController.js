const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/order");
const Cart = require("../models/cart");
const User = require("../models/user");
const nodemailer = require("nodemailer");

const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const subscriptionType = session.amount_total;
      const subscribeId = session.subscription;
      const userId = session.client_reference_id;
      const orderId = session.metadata.orderId;
      try {
        const user = await User.findById(userId);
        if (user) {
          if (subscriptionType == 49900) {
            user.isSubscribe = "premium";
          } else {
            user.isSubscribe = "basic";
          }
          user.subscriptionId = subscribeId;
          await user.save();
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
          await transporter.sendMail({
            to: user.email,
            subject: "Welcome to Premium",
            html: "<h1>Thank you for subscribing!</h1>",
          });
        }
        const order = await Order.findById(orderId)
          .populate("userId")
          .populate("orderData.products.productId");
        if (order) {
          if (order.paymentDetail?.paymentStatus !== "complete") {
            order.paymentDetail = {
              paymentIntentId: session.payment_intent,
              paymentMode: session.payment_method_types[0],
              paymentStatus: session.status,
            };

            await order.save();
            const cart = await Cart.findOne({ userId: order.userId });
            if (cart) {
              cart.products = [];
              cart.total = 0;
              await cart.save();
            }
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
              html: `    <div>
        <div>
          <h2>🧾 Thank you for your order, ${order.userId.fullName}!</h2>
          <p>Order placed on: <strong>${order.createdAt}</strong></p>
          <p><strong>Shipping to:</strong> ${order.info.address}, ${order.info.city}, ${order.info.pincode}, ${order.info.country}</p>
          <hr/>
          ${productList}
          <hr/>
          <p><strong>Total:</strong> ₹${order.total}</p>
          <p>Your Order Status is:<h1 style="color:orange;">${order.status}</h1></p>
          <p>Your Payment ID is:<h1>${order.paymentDetail.paymentIntentId}</h1></p>
          <p>Your Payment Status is:<h1 style="color:green;">${order.paymentDetail.paymentStatus}</h1></p>
          <p>Your Payment Mode is:<h1 style="color:red;">${order.paymentDetail.paymentMode}</h1></p>

          <p>We’ll notify you once your items are shipped.</p>
          <p>Thank you for shopping with us!</p>
          <div>
            This is an automated email. Please do not reply.
          </div>
        </div>
      </div>`,
            });
          }
        }
      } catch (err) {
        console.error("Order update failed", err);
      }
      break;
    case "customer.subscription.updated":
      const updatedSubscription = event.data.object;
      const subscribType = updatedSubscription.plan.amount;
      const customerId = updatedSubscription.customer;
      const customer = await stripe.customers.retrieve(customerId);
      console.log("customer", customer);
      try {
        const userId = customer.metadata.userId;

        const user = await User.findById(userId);
        if (user) {
          if (updatedSubscription.cancel_at_period_end) {
            user.isSubscribe = "free";
            user.subscriptionId = null;
          } else {
            if (subscribType == 49900) {
              user.isSubscribe = "premium";
            } else {
              user.isSubscribe = "basic";
            }
            user.subscriptionId = updatedSubscription.id;
          }

          await user.save();

          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          await transporter.sendMail({
            to: user.email,
            subject: "Welcome to SHOP.IN",
            html: "<h1>Thank you for Updating your subscription!</h1>",
          });
        }
      } catch (err) {
        console.error("Order update failed", err);
      }
      break;
  }
  res.status(200).json({ received: true });
};

module.exports = { webhook };
