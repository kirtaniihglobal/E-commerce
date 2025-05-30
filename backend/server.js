const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoute");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
