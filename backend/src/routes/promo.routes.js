// routes/promo.routes.js
const express = require("express");
const router = express.Router();
const {
  createPromo,
  getPromos,
  getPromoById,
  updatePromo,
  deletePromo,
} = require("../controllers/promo.controller");

// Create
router.post("/", createPromo);

// Read all
router.get("/", getPromos);

// Read one
router.get("/:id", getPromoById);

// Update
router.put("/:id", updatePromo);

// Delete
router.delete("/:id", deletePromo);

module.exports = router;
