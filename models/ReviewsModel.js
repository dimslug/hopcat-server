const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: String,
    unique: true,
    required: true,
  },
  drinkID: {
    type: String,
    required: true,
  },
  influencerID: {
    type: String,
    required: true,
  },
  rating: {
    stars: {
      type: Number,
      required: true,
    },
    maxStars: {
      type: Number,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
