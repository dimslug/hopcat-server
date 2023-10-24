const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  // reviewID: {
  //   type: String,
  //   unique: true,
  //   required: true,
  // },
  // reviewType: {
  //   type: String,
  //   required: true,
  //   enum: ["creator", "drink"],
  // },
  // reviewTypeID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  // },
  promoID: {
    type: mongoose.Types.ObjectId,
    ref: "Promo",
    required: true,
  },
  inflID: {
    type: mongoose.Types.ObjectId,
    ref: "Influencer",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
  },
  // photo: {
  //   type: String,
  // },

});

module.exports = mongoose.model("Review", ReviewSchema);