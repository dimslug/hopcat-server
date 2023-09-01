const mongoose = require("mongoose");

const DrinkSchema = new mongoose.Schema({
drinkID: {
    type: mongoose.Types.ObjectId,
    required: true,
    unique: true
},
creatorID: {
    type: mongoose.Types.ObjectId,
    ref: "Creator",
    required: true
},
cat1: {
    type: string,
    required: true
},
cat2: {
    type: string

},
cat3: {
    type: string

},
price: {
    type: number

},
description:{
    type: string

},
photo:{
    type: string

},
ingredients: [],


})


module.exports = mongoose.model("Drink", DrinkSchema);