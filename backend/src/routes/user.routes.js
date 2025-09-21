const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/user.controller");

const Authjwt = require("../middlewares/Authjwt"); // your middleware

// ✅ Public routes
router.post("/register", createUser);   // Create new user
router.post("/login", loginUser);       // Login


router.get("/", Authjwt(), getAllUsers);               // Any logged-in user
router.get("/:id", Authjwt(), getUserById);            // Any logged-in user
router.put("/:id", Authjwt(["admin"]), updateUser);    // Only admin can update users
router.delete("/:id", Authjwt(["admin"]), deleteUser); // Only admin can delete users

module.exports = router;
