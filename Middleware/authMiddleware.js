const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decodedToken;
    next();
  });
}

module.exports = { authenticate };
