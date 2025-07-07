<<<<<<< HEAD
=======

>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
const { default: mongoose } = require("mongoose");
const Product = require("../models/product");
const Rating = require("../models/rating");

const addRating = async (req, res) => {
<<<<<<< HEAD
  const { rating, productId, comment } = req.body;
  const userId = req.user.id;
  try {
    const newRate = new Rating({ userId, productId, rating, comment });
    await newRate.save();
    return res.status(201).json({
      msg: "Rating Submitted",
      status: true,
      rating: newRate,
    });
  } catch (error) {
    console.error("Rating Error:", error);
    return res
      .status(500)
      .json({ status: false, msg: "Failed to Submit rating" });
  }
=======
    const { rating, productId, comment } = req.body;
    const userId = req.user.id;
    try {
        const newRate = new Rating({ userId, productId, rating, comment });
        await newRate.save();
        const findRatingStats = await Rating.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: "$productId",
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);
        const finalRating = findRatingStats[0]?.averageRating?.toFixed(1) || 0;
        const updateRate = await Product.findByIdAndUpdate(
            productId,
            { rating: finalRating },
            { new: true }
        );
        return res.status(201).json({
            msg: "Rating Submitted",
            status: true,
            rating: finalRating,
            updateRate,
        });
    } catch (error) {
        console.error("Rating Error:", error);
        return res
            .status(500)
            .json({ status: false, msg: "Failed to Submit rating" });
    }
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
};

const getUserRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;
    const findRate = await Rating.findOne({
      userId: userId,
      productId: productId,
    });
    return res.status(200).json({
      status: true,
      message: "Rating fetched successfully",
      findRate,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to fetch orders",
      error: error.message,
    });
  }
};
const getOneProductRating = async (req, res) => {
  try {
    const productId = req.params.id;
    const findProductRate = await Rating.find({
      productId: productId,
    }).populate("userId");
    return res.status(200).json({
      status: true,
      message: "Rating fetched successfully",
      findProductRate,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to fetch orders",
      error: error.message,
    });
  }
};
const updateUserRating = async (req, res) => {
<<<<<<< HEAD
  try {
    const ratingId = req.params.id;
    const { rating, comment } = req.body;
    const prevRating = await Rating.findById(ratingId);
    if (!prevRating) {
      return res.status(404).json({ status: false, msg: "Rating not found" });
=======
    try {
        const ratingId = req.params.id;
        const { rating, comment } = req.body;

        const prevRating = await Rating.findById(ratingId);
        if (!prevRating) {
            return res.status(404).json({ status: false, msg: "Rating not found" });
        }
        const productId = prevRating.productId;
        await Rating.findByIdAndUpdate(ratingId, { rating, comment }, { new: true });
        const findRatingStats = await Rating.aggregate([
            { $match: { productId: new mongoose.Types.ObjectId(productId) } },
            {
                $group: {
                    _id: "$productId",
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);
        console.log(findRatingStats)
        const finalRating = findRatingStats[0]?.averageRating?.toFixed(1) || 0;
        console.log(finalRating)
        const updateRate = await Product.findByIdAndUpdate(
            productId,
            { rating: finalRating },
            { new: true }
        );

        return res.status(200).json({
            status: true,
            message: "Rating updated successfully",
            updateRate
        });

    } catch (error) {
        console.error("Error updating rating:", error);
        return res.status(500).json({
            status: false,
            msg: "Failed to update rating",
            error: error.message
        });
>>>>>>> 6a15ae0f658c522fcd9a4526f4bed7decae36d8a
    }
    await Rating.findByIdAndUpdate(
      ratingId,
      { rating, comment },
      { new: true }
    );
    return res.status(200).json({
      status: true,
      message: "Rating updated successfully",
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    return res.status(500).json({
      status: false,
      msg: "Failed to update rating",
      error: error.message,
    });
  }
};

module.exports = {
  addRating,
  getUserRating,
  updateUserRating,
  getOneProductRating,
};
