const mongoose = require("mongoose");

// createa a schema for the a profile for an influencer

const influProfileSchema = new mongoose.Schema({

    influencerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Influencer",
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    profilePicture: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    bio: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    socialMedia: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 100,
    },
    location: {
        type: String,
        trim: true,
        minlength: 1,
        maxlength: 100,
    }


});

module.exports = mongoose.model("InfluProfile", influProfileSchema);