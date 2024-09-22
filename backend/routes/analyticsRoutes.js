const express = require("express");
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");
const { getAnalytics } = require("../controllers/analyticsController");
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAnalytics);

module.exports = router;
