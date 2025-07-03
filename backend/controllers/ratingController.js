
const Product = require("../models/product");
const Rating = require("../models/rating");
// const User = require("../models/user");


const addRating = async (req, res) => {
    const { rating, productId, comment } = req.body;
    const id = req.user.id;
    try {
        console.log(productId)
        console.log(rating)
        console.log(comment)
        const newRate = new Rating({ userId: id, productId: productId, rating: rating, comment: comment })
        await newRate.save();
        const findRatingNumber = await Rating.countDocuments({ productId: productId })
        console.log(findRatingNumber)
        const findProduct = await Product.findOne({ _id: productId })
        const oldRate = findProduct.rating * (findRatingNumber - 1)
        const finalUpdateRate = Number((oldRate + rating) / findRatingNumber.toFixed(1));
        // console.log("updateRate", updateRate)
        const updateRate = await Product.findByIdAndUpdate({ _id: productId }, { rating: finalUpdateRate }, { new: true })
        return res.status(201).json({ msg: "Rating Submitted", status: true, updateRate });

    } catch (error) {

        return res.status(500).json({ status: false, msg: "Failed to Submit rating" })
    }

}
const getUserRating = async (req, res) => {
    try {
        console.log("hello")
        const userId = req.user.id;
        const productId = req.params.id;
        console.log(userId)
        console.log(productId)
        const findRate = await Rating.findOne({ userId: userId, productId: productId })
        console.log(findRate)
        return res.status(200).json({
            status: true,
            message: "Rating fetched successfully",
            findRate
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return res.status(500).json({ status: false, msg: "Failed to fetch orders", error: error.message });
    }
};
const updateUserRating = async (req, res) => {
    try {
        const ratingId = req.params.id;
        const { rating, comment } = req.body;
        // console.log(rating)
        // console.log(comment)
        const prevRating = await Rating.findById(ratingId)
        // console.log("prevRating", prevRating);
        const total = await Rating.countDocuments({ productId: prevRating.productId });
        // console.log("total", total)
        const product = await Product.findOne({ _id: prevRating.productId })
        // console.log("product", product)
        const oldCount = product.rating * total
        const newCount = oldCount - prevRating.rating + rating
        const finalCount = Number((newCount / total).toFixed(1));
        // console.log("finalCount", finalCount)
        await Rating.findByIdAndUpdate({ _id: ratingId }, { rating, comment }, { new: true })
        const updateRate = await Product.findByIdAndUpdate({ _id: prevRating.productId }, { rating: finalCount }, { new: true })
        // console.log(updateRate)
        return res.status(200).json({
            status: true,
            message: "Rating Update successfully",
            updateRate
        });
    } catch (error) {
        console.error("Error updating rating:", error);
        return res.status(500).json({ status: false, msg: "Failed to update Rating", error: error.message });
    }
};


module.exports = { addRating, getUserRating, updateUserRating };