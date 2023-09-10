const mongoose = require("mongoose");

const CreatorSchema = new mongoose.Schema({
    // creatorID: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     unique: true
    // },
    username: {
         type: String,
        required: true,
        unique: true
    },
    firstName:{
         type: String,
        required: false,
        
    },
    lastName:{
         type: String,
        required: false,
        
    },
    email:{
         type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    socials: []
});

module.exports = mongoose.model("Creator", CreatorSchema);