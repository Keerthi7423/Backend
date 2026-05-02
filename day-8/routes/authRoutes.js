const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  deleteUser
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get(
  "/profile",
  authMiddleware,
  getProfile
);

// ADMIN ONLY
router.delete(
  "/delete-user/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteUser
);

module.exports = router;