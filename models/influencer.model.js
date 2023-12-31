const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
    },
  ],

  followingCreators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Creator",
    },
  ],
});

module.exports = mongoose.model("Influencer", influencerSchema);

/* ,
        influencerID: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            required: true            
        } */
