const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: String,
    unique: true,
    required: true,
  },
  reviewType: {
    type: String,
    required: true,
    enum: ["creator", "drink"],
  },
  reviewTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  influencerID: {
    type: mongoose.Schema.Types.ObjectId,
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
