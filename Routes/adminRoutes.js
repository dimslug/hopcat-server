const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require("../Middleware/adminAuthMiddleware");

router.use(adminAuthMiddleware);

module.exports = router;
