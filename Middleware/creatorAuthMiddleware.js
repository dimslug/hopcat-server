const jwt = require("jsonwebtoken");
const Creator = require("../models/CreatorModel");
const SECRET = process.env.JWT_SECRET;

function creatorAuthenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const creator = await Creator.findById(decodedToken.id);

      if (!creator) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.creator = creator;

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

module.exports = { creatorAuthenticate };
