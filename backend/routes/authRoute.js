const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  register,
  login,
  verifyToken,
} = require("../controllers/userController");

router.post("/register", upload.single("profileImage"), register);
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
