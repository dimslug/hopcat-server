const express = require("express");
const router = express.Router();
const Review = require("../models/ReviewModel");

const errorResponse = (res, error) => {
  return res.status(500).json({
    error: error.message,
  });
};

//! Create a new review
router.post("/reviews", async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = new Review(reviewData);
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get all reviews
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get a review by ID
router.get("/reviews/:reviewID", async (req, res) => {
  try {
    const { reviewID } = req.params;
    const review = await Review.findOne({ reviewID });
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(200).json(review);
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Update a review by ID
router.patch("/reviews/:reviewID", async (req, res) => {
  try {
    const { reviewID } = req.params;
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
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Delete a review by ID
router.delete("/reviews/:reviewID", async (req, res) => {
  try {
    const { reviewID } = req.params;
    const deletedReview = await Review.findOneAndDelete({ reviewID });
    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    res.status(204).send();
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;
