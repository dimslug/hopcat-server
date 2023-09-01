const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
promotionID: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true

},
creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "Creator",
    required: true

},
drinkID: {
    type: mongoose.Types.ObjectId,
    ref: "Drink",
    required: true

},
influencerID: {
    type: mongoose.Types.ObjectId,
    ref: "Influencer",

},
startDate: {
    type: Date,
    required: true

},
endDate: {
    type: Date,


},



})

module.exports = mongoose.model("Promotion", PromotionSchema)