const express = require("express");
const User = require("../models/user");
const router = express.Router();
const upload = require("../middleware/upload")
const { verifyToken } = require("../middleware/auth");
const {
  register,
  login,
  profileDetail,
  updateProfile,
  blockUser
} = require("../controllers/userController");
const {
  getAllUsers
} = require("../controllers/adminController");

router.post("/register", upload.single("image"), register);
router.post("/login", login);
router.get("/UserDetail", verifyToken, profileDetail);
router.put("/UserUpdate", upload.single("image"), verifyToken, updateProfile);
router.get("/AllUsers", upload.single("image"), getAllUsers);
router.put("/blockUser/:id", blockUser);


module.exports = router;
