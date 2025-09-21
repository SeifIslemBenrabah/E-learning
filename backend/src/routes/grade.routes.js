// routes/grade.routes.js
const express = require("express");
const router = express.Router();
const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
} = require("../controllers/grade.controller");

// Create grade
router.post("/", createGrade);

// Get all grades
router.get("/", getAllGrades);

// Get grade by ID
router.get("/:id", getGradeById);

// Update grade
router.put("/:id", updateGrade);

// Delete grade
router.delete("/:id", deleteGrade);

module.exports = router;
