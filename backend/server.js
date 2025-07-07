const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");






const authRoutes = require("./routes/authRoute");
const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoute");
const addressRoutes = require("./routes/addressRoute");
const adminRoutes = require("./routes/adminRoute");
const ratingRoutes = require("./routes/ratingRoute");
const wishlistRoutes = require("./routes/wishlistRoute");
const orderRoutes = require("./routes/orderRoute");





const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();




app.use(cors());
app.use(express.json());
app.use("/api/auth/", authRoutes);
app.use("/api/products/", productRoutes)
app.use("/api/cart/", cartRoutes)
app.use("/api/order/", orderRoutes)
app.use("/api/address/", addressRoutes)
app.use("/api/admin/", adminRoutes)
app.use("/api/rating/", ratingRoutes)
app.use("/api/wishList/", wishlistRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
