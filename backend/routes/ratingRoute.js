const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth")
const { addRating, getUserRating, updateUserRating, getOneProductRating } = require("../controllers/ratingController");




router.post("/", verifyToken, addRating)
router.get("/getRate/:id", verifyToken, getUserRating)
router.put("/updateRate/:id", updateUserRating)
router.get("/getProductRate/:id", getOneProductRating)




module.exports = router