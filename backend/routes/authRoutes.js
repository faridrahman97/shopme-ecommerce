const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  signup,
  refresh,
  getProfile,
} = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/profile", protectRoute, getProfile);

module.exports = router;
