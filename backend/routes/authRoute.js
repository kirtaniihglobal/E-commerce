const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
  register,
  login,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ status: 500, message: "Error fetching user" });
  }
});

module.exports = router;
