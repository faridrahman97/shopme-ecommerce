const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const {
  createCheckoutSession,
  checkoutSuccess,
} = require("../controllers/paymentController");

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkoutSuccess);

module.exports = router;
