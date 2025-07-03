
const Product = require("../models/product");
const Rating = require("../models/rating");


const addRating = async (req, res) => {
    const { rating, productId, comment } = req.body;
    const id = req.user.id;
    try {
        const newRate = new Rating({ userId: id, productId: productId, rating: rating, comment: comment })
        await newRate.save();
        const findRatingNumber = await Rating.countDocuments({ productId: productId })
        console.log(findRatingNumber)
        const findProduct = await Product.findOne({ _id: productId })
        const oldRate = findProduct.rating * (findRatingNumber - 1)
        const finalUpdateRate = Number((oldRate + rating) / findRatingNumber.toFixed(1));
        const updateRate = await Product.findByIdAndUpdate({ _id: productId }, { rating: finalUpdateRate }, { new: true })
        return res.status(201).json({ msg: "Rating Submitted", status: true, updateRate });
    } catch (error) {
        return res.status(500).json({ status: false, msg: "Failed to Submit rating" })
    }

}
const getUserRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const productId = req.params.id;
        const findRate = await Rating.findOne({ userId: userId, productId: productId })
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
const getOneProductRating = async (req, res) => {
    try {
        const productId = req.params.id;
        const findProductRate = await Rating.find({ productId: productId }).populate("userId")
        return res.status(200).json({
            status: true,
            message: "Rating fetched successfully",
            findProductRate
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
        const prevRating = await Rating.findById(ratingId)
        const total = await Rating.countDocuments({ productId: prevRating.productId });
        const product = await Product.findOne({ _id: prevRating.productId })
        const oldCount = product.rating * total
        const newCount = oldCount - prevRating.rating + rating
        const finalCount = Number((newCount / total).toFixed(1));
        await Rating.findByIdAndUpdate({ _id: ratingId }, { rating, comment }, { new: true })
        const updateRate = await Product.findByIdAndUpdate({ _id: prevRating.productId }, { rating: finalCount }, { new: true });
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


module.exports = { addRating, getUserRating, updateUserRating, getOneProductRating };