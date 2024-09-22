const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedProduct,
} = require("../controllers/productController");
const { protectRoute, adminRoute } = require("../middleware/authMiddleware");

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.get("/recommendations", getRecommendedProducts);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

module.exports = router;
