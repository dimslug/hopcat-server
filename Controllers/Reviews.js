const Review = require("../models/ReviewsModel");
const createReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ error: "Could not create the review" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve reviews" });
  }
};

const getReviewById = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    const review = await Review.findOne({ reviewID });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the review" });
  }
};

const updateReviewById = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    const updatedData = req.body;
    const updatedReview = await Review.findOneAndUpdate(
      { reviewID },
      updatedData,
      {
        new: true,
      }
    );
    if (!updatedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Could not update the review" });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const reviewID = req.params.reviewID;
    const deletedReview = await Review.findOneAndDelete({ reviewID });
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Could not delete the review" });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
};
