const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  drinkID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Drink",
    required: true,
  },
  influencerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Influencer",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);

module.exports = Rating;
