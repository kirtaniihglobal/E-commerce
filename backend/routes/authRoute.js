const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../middleware/upload");
const { verifyToken } = require("../controllers/auth");
const {
  register,
  login,
} = require("../controllers/userController");

router.post("/register", upload.none(), register);
router.post("/login", login);
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

module.exports = router;
