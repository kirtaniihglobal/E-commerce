const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../middleware/upload")
const { verifyToken } = require("../middleware/auth");
const {
  register,
  login,
  profileDetail,
  updateProfile
} = require("../controllers/userController");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/UserDetail", verifyToken, profileDetail);
router.put("/UserUpdate", upload.single("image"), verifyToken, updateProfile);


module.exports = router;
