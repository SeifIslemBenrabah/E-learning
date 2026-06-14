const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/user.controller");

const Authjwt = require("../middlewares/Authjwt");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: "Too many login attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post("/register", registerUser);
router.post("/login", loginLimiter, loginUser);

// Protected routes
router.get("/", Authjwt(), getAllUsers);
router.get("/:id", Authjwt(), getUserById);
router.put("/:id", Authjwt(["admin"]), updateUser);
router.delete("/:id", Authjwt(["admin"]), deleteUser);

module.exports = router;
