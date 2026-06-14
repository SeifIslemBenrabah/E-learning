// routes/module.routes.js
const express = require("express");
const router = express.Router();
const {
  createModule,
  getAllModules,
  getModuleById,
  searchModules,
  updateModule,
  deleteModule,
  getAllModulesByteacherId,
  getAllModulesByGradeId
} = require("../controllers/module.controller");

// Create a module
router.post("/", createModule);

// Get all modules
router.get("/", getAllModules);

// Search modules (by name/description)
router.get("/search", searchModules);


router.get("/teacher/:teacherId", getAllModulesByteacherId)
router.get("/grade/:gradeId", getAllModulesByGradeId)
// Get a module by ID
router.get("/:id", getModuleById);

// Update a module
router.put("/:id", updateModule);

// Delete a module
router.delete("/:id", deleteModule);

module.exports = router;
