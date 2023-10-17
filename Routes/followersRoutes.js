const express = require("express");
const router = express.Router();
const authenticate = require("..Middleware/authMiddleware");
const Influencer = require("../models/Influencer");
const Creator = require("../models/Creator");

//! Follow a user
router.post("/follow/:followedUserId", authenticate, async (req, res) => {
  try {
    const { followedUserId } = req.params;
    const { userId } = req.user;

    const influencer = await Influencer.findById(userId);
    const isFollowing = influencer.following.includes(followedUserId);

    if (isFollowing) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    influencer.following.push(followedUserId);
    await influencer.save();

    return res.status(200).json({ message: "You are now following this user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

//! Unfollow a user
router.post("/unfollow/:followedUserId", authenticate, async (req, res) => {
  try {
    const { followedUserId } = req.params;
    const { userId } = req.user;

    const influencer = await Influencer.findById(userId);
    const isFollowing = influencer.following.includes(followedUserId);

    if (!isFollowing) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    influencer.following = influencer.following.filter(
      (userId) => userId !== followedUserId
    );

    await influencer.save();

    return res.status(200).json({ message: "You have unfollowed this user" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/following", authenticate, async (req, res) => {
  try {
    const { userId } = req.user;

    const influencer = await Influencer.findById(userId).populate("following");

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    return res.status(200).json({ following: influencer.following });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
