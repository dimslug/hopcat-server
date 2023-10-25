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
    unique: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
  },
}
);

module.exports = mongoose.model("Creator", CreatorSchema);
