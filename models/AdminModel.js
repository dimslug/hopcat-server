const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  adminID: {
    type: String,
    unique: true,
    required: true,
  },
  ID: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
