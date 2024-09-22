const express = require("express");
const router = express.Router();
const {
  getCartProducts,
  addToCart,
  removeAllFromCart,
  updateQuantity,
} = require("../controllers/cartController");
const { protectRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, getCartProducts);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);

module.exports = router;
