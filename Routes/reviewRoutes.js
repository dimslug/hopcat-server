const express = require("express");
const router = express.Router();
const { authenticate } = require("./authMiddleware");
const Review = require("../models/reviewModel");
router.post("/reviews", authenticate, async (req, res) => {
  try {
    if (req.user.role === "influencer") {
      return res.status(201).json({ message: "Review created successfully" });
    }

    return res.status(403).json({ message: "Forbidden" });
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
      (req.user.role === "influencer" && req.user.userId === review.creatorId)
    ) {
      await review.remove();
      return res.status(204).send();
    }

    return res.status(403).json({ message: "Forbidden" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({});

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
