const express = require("express");
const Address = require("../models/address");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    addAddress,
    getAllAddress,
    deleteAddress,
    updateAddress
} = require("../controllers/addressController");

router.post("/addAddress", verifyToken, addAddress);
router.get("/getAddress", verifyToken, getAllAddress);
router.delete("/deleteAddress/:id", verifyToken, deleteAddress);
router.put("/updateAddress/:id", verifyToken, updateAddress);


module.exports = router;
