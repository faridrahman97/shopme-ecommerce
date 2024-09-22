const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const {
  getCoupon,
  validateCoupon,
} = require("../controllers/couponController");

router.get("/", protectRoute, getCoupon);
router.post("/validate", protectRoute, validateCoupon);
module.exports = router;
