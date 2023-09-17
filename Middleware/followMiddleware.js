const Influencer = require("../models/influencer.model");

async function followCreator(req, res, next) {
  try {
    const influencerId = req.user._id;
    const creatorId = req.params.creatorId;

    const influencer = await Influencer.findById(influencerId);

    if (influencer.followingCreators.includes(creatorId)) {
      influencer.followingCreators.pull(creatorId);
    } else {
      influencer.followingCreators.push(creatorId);
    }

    await influencer.save();

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { followCreator };
