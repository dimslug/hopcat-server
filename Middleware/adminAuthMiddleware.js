const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminModel");
const SECRET = process.env.JWT_SECRET;

function adminAuthenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const admin = await Admin.findById(decodedToken.id);

      if (!admin) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.admin = admin;

      next();
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
}

module.exports = { adminAuthenticate };
