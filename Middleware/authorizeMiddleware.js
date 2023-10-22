function authorizeAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}

function authorizeInfluencer(req, res, next) {
  if (req.user && req.user.role === "influencer") {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}

function authorizeDeleteReview(req, res, next) {
  if (
    req.user &&
    (req.user.role === "admin" || req.user.userId === req.params.creatorId)
  ) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden" });
}

module.exports = { authorizeAdmin, authorizeInfluencer, authorizeDeleteReview };
