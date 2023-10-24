const router = require("express").Router();
const { Review } = require("../models")
const validateSession = require("../middleware/validate-session")

const errorResponse = (res, error) => {
  return res.status(500).json({
    error: error.message,
  });
};

//! Create a new review
router.post("/review", validateSession, async (req, res) => {
  try {
    console.log("inside review post: ", req.body)
    // const userRole = req.user.role;
    // if (userRole === "influencer") 
    // {
      const promoID = req.body.promoID;
      const inflID = req.body.inflID;
      const rating = req.body.rating;
      const description = req.body.description
      // const photo = req.body.photo

      const review = new Review({
        promoID: promoID,
        inflID: inflID,
        rating: rating,
        description: description,
        // photo: photo,
      });

      const newReview = await review.save();
      return res.status(201).json(newReview);
    // } else {
    //   return res
    //     .status(403)
    //     .json({ error: "Forbidden: Only influencers can create reviews" });
    // }
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Get all reviews (visible to everyone)
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
    const userRole = req.user.role;

    if (userRole === "influencer") {
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
      return res.status(200).json(updatedReview);
    } else {
      return res
        .status(403)
        .json({ error: "Forbidden: Only influencers can update reviews" });
    }
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Delete a review by ID
router.delete("/reviews/:reviewID", async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === "admin" || userRole === "influencer") {
      const { reviewID } = req.params;
      const deletedReview = await Review.findOneAndDelete({ reviewID });
      if (!deletedReview) {
        return res.status(404).json({ error: "Review not found" });
      }
      return res.status(204).send();
    } else {
      return res.status(403).json({
        error: "Forbidden: Only admins and influencers can delete reviews",
      });
    }
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;
