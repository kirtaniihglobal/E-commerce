// const Product = require("../models/product");
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { addRating, getUserRating, updateUserRating } = require("../controllers/ratingController");




router.post("/", verifyToken, addRating)
router.get("/getRate/:id", verifyToken, getUserRating)
router.put("/updateRate/:id", updateUserRating)




module.exports = router