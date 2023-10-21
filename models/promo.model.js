const mongoose = require("mongoose");


const PromoSchema = new mongoose.Schema({
  // promoID: {
  //     type: mongoose.Types.ObjectId,
  //     required: true,
  //     unique: true

  // },
  creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "Creator",
    required: true,
  },
  drinkID: {
    type: mongoose.Types.ObjectId,
    ref: "Drink",
    required: true,
  },
  //! Or an array of usernames or combination of ID's and usernames
  // influencerID: {
  //     type: mongoose.Types.ObjectId,
  //     ref: "Influencer",

  // },
  promoText: {
    type: String,
  },

  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  promoPlace: {
    type: Object,
    required: true

  },



})

module.exports = mongoose.model("Promo", PromoSchema)

