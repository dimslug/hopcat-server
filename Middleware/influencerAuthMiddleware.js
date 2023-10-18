const jwt = require("jsonwebtoken");
const Influencer = require("../models/InfluencerModel");
const SECRET = process.env.JWT_SECRET;

function influencerAuthenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const influencer = await Influencer.findById(decodedToken.id);

      if (!influencer) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.influencer = influencer;

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

module.exports = { influencerAuthenticate };
