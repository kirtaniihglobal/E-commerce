const express = require("express");
const Address = require("../models/address");
const router = express.Router();
const { verifyToken, checkBlockUser } = require("../middleware/auth");
const {
    addAddress,
    getAllAddress,
    deleteAddress,
    updateAddress
} = require("../controllers/addressController");

router.post("/addAddress", verifyToken, checkBlockUser, addAddress);
router.get("/getAddress", verifyToken, getAllAddress);
router.delete("/deleteAddress/:id", verifyToken, checkBlockUser, deleteAddress);
router.put("/updateAddress/:id", verifyToken, checkBlockUser, updateAddress);


module.exports = router;
