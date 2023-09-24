const router = require("express").Router();
const { response } = require("express");
const Creator = require("../models/creator.model");
const bcrypt = require("bcrypt");
const { error, success, incomplete } = require("../helpers");
const validateSession = require("../Middleware/validate-session");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

// !! Create/Signup -- POST
router.post("/signup", async (req, res) => {
  try {
    const creator = new Creator({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 13),
      socials: req.body.socials,
    });
    const newCreator = await creator.save();
    const token = jwt.sign({ id: newCreator._id }, SECRET, {
      expiresIn: "1 day",
    });
    res.status(200).json({
      creator: newCreator,
      message: "Success!",
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// !! Login -- POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const creator = await Creator.findOne({ email: email });
    const passwordMatch = await bcrypt.compare(password, creator.password);
    if (!creator || !passwordMatch)
      throw new Error("That combination of Email and Password does not match");
    const token = jwt.sign({ id: creator._id }, SECRET, {
      expiresIn: "1 day",
    });
    let creatorID = creator._id;
    res.status(200).json({
      message: `Success!`,
      creator,
      creatorID,
      token,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// !! Update By ID -- PATCH
router.patch("/edit/:creatorID", validateSession, async (req, res) => {
  try {
    const creatorID = req.params.creatorID;
    const newUsername = req.body.username;
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const newEmail = req.body.email;
    const newSocials = req.body.socials;

    const updatedInfo = {
      username: newUsername,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      socials: newSocials,
    };
    const updatedCreator = await Creator.findOneAndUpdate(
      { _id: creatorID },
      updatedInfo,
      { new: true }
    );
    if (!updatedCreator) {
      return res.status(404).json({ message: "Creator Not Found" });
    }
    res
      .status(200)
      .json({ message: "Creator has been updated", updatedCreator });
  } catch (err) {
    error(res, err);
  }
});

// !! Get One by ID -- GET
router.get("/:creatorID/", async (req, res) => {
  try {
    const creatorID = req.params.creatorID;
    const getCreator = await Creator.find({ _id: creatorID });

    getCreator ? success(res, getCreator) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

// !! Get All -- GET
router.get("/", async (req, res) => {
  try {
    const getAllCreators = await Creator.find();

    getAllCreators ? success(res, getAllCreators) : incomplete(res);
  } catch (err) {
    error(res, err);
  }
});

// !! Delete -- DELETE
router.delete("/delete/:creatorID", validateSession, async (req, res) => {
  try {
    const creatorID = req.params.creatorID;

    const deleteCreator = await Creator.deleteOne({
      _id: creatorID,
    });

    if (!deleteCreator) {
      return res.status(404).json({ message: "Creator Not Found" });
    }
    res.status(200).json({ message: "Creator has been deleted" });
  } catch (err) {
    error(res, err);
  }
});

module.exports = router;
