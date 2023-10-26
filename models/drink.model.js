const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema({
  // drinkID: {
  //     type: mongoose.Types.ObjectId,
  //     required: true,
  //     unique: true
  // },
  name: {
    type: String,
    required: true,
  },
  creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "Creator",
    required: true,
  },
  cat1: {
    type: String,
    required: true,
  },
  cat2: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  ratings: {
    type: Array,
    default: 0,
  },
});

module.exports = mongoose.model("Drink", DrinkSchema);
