const router = require("express").Router();
const { response } = require("express");
const Influencer = require("../models/influencer.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
const SECRET = process.env.JWT;

const errorResponse = (res, error) => {
  return res.status(500).json({
    error: error.message,
  });
};

//! Signup POST
router.post("/signup", async (req, res) => {
  try {
    const influencer = new Influencer({
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: bcrypt.hashSync(req.body.password, 13),
      dateOfBirth: req.body.dateOfBirth,
    });

    const newInfluencer = await influencer.save();

    const token = jwt.sign({ id: newInfluencer._id }, SECRET, {
      expiresIn: "1 day",
    });
    let influencerID = influencer._id;
    res.status(200).json({
      influencer: newInfluencer,
      influencerID,
      message: "success",
      token,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Login POST
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const influencer = await Influencer.findOne({ email: email });

    const passwordMatch = await bcrypt.compare(password, influencer.password);

    if (!influencer || !passwordMatch)
      throw new Error("Email or Password does not match");

    const token = jwt.sign({ id: influencer._id }, SECRET, {
      expiresIn: "1 day",
    });
    let influencerID = influencer._id;
    res.status(200).json({
      message: "success",
      influencer,
      influencerID,
      token,
    });
  } catch (err) {
    console.log(err);
    errorResponse(res, err);
  }
});

//! Get all
router.get("/", validateSession, async (req, res) => {
  try {
    const getAllInfl = await Influencer.find();

    getAllInfl
      ? res.status(200).json({
          getAllInfl,
        })
      : res.status(404).json({
          message: `No rooms(s) Found`,
        });
  } catch (err) {
    console.log(err);
    errorResponse(res, err);
  }
});

//! Get One by ID
router.get("/:id", validateSession, async (req, res) => {
  try {
    const { _id } = req.params;
    const getInfl = await Influencer.findOne({ id: _id });

    getInfl
      ? res.status(200).json({
          getInfl,
        })
      : res.status(404).json({
          message: "no influencer found",
        });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Update by ID
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    const { id } = req.params;

    const filter = { _id: id };

    const info = req.body;

    const returnOption = { new: true };

    const updated = await Influencer.findOneAndUpdate(
      filter,
      info,
      returnOption
    );

    res.status(200).json({
      message: `${updated.username} Updated!`,
      updated,
    });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Delete by ID
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteInfl = await Influencer.deleteOne({ _id: id });

    deleteInfl.deleteCount
      ? res.status(200).json({ message: "Influencer Deleted" })
      : res.status(404).json({ message: "No Influencer Found" });
  } catch (err) {
    errorResponse(res, err);
  }
});

//! Follow an influencer
router.post(
  "/follow/influencer/:influencerId",
  validateSession,
  async (req, res) => {
    try {
      const { influencerId } = req.params;
      const influencerToFollow = await Influencer.findById(influencerId);

      if (!influencerToFollow) {
        return res.status(404).json({ message: "Influencer not found" });
      }

      const currentUser = req.user;

      if (currentUser.following.includes(influencerId)) {
        return res
          .status(400)
          .json({ message: "Already following this influencer" });
      }

      currentUser.following.push(influencerId);
      await currentUser.save();

      res
        .status(200)
        .json({ message: "You are now following this influencer" });
    } catch (err) {
      errorResponse(res, err);
    }
  }
);

//! Follow a creator
router.post("/follow/creator/:creatorId", validateSession, async (req, res) => {
  try {
    const { creatorId } = req.params;

    const creatorToFollow = await Creator.findById(creatorId);

    if (!creatorToFollow) {
      return res.status(404).json({ message: "Creator not found" });
    }

    const currentUser = req.user;

    if (currentUser.followingCreators.includes(creatorId)) {
      return res
        .status(400)
        .json({ message: "Already following this creator" });
    }

    currentUser.followingCreators.push(creatorId);
    await currentUser.save();

    res.status(200).json({ message: "You are now following this creator" });
  } catch (err) {
    errorResponse(res, err);
  }
});

module.exports = router;
