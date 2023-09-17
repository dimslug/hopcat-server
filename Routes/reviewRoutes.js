const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const authenticate = require("..authMiddleware");

router.post("/reviews", authenticate, async (req, res) => {
  try {
    const { reviewType, reviewTypeID } = req.body;

    if (
      req.user.role === "influencer" &&
      (reviewType === "creator" || reviewType === "drink")
    ) {
      const reviewData = req.body;
      const newReview = new Review(reviewData);
      const savedReview = await newReview.save();
      return res.status(201).json(savedReview);
    }

    return res.status(403).json({
      error:
        "Forbidden: Only influencers can create reviews for creators and drinks",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/reviews/:reviewId", authenticate, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (
      req.user.role === "admin" ||
      (req.user.role === "influencer" &&
        (req.user.userId === review.influencerID ||
          req.user.userId === review.creatorID))
    ) {
      await review.remove();
      return res.status(204).send();
    }

    return res.status(403).json({
      error:
        "Forbidden: Only admins, the review creator, or the reviewed creator can delete reviews",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
