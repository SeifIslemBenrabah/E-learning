const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher.controller");

// Create a new teacher
router.post("/", teacherController.createTeacher);

// Get all teachers
router.get("/", teacherController.getAllTeachers);

// Get teacher by ID
router.get("/:id", teacherController.getTeacherById);

// Update teacher
router.put("/:id", teacherController.updateTeacher);

// Delete teacher
router.delete("/:id", teacherController.deleteTeacher);

// Search teachers (e.g., /teachers/search?query=math)
router.get("/search/find", teacherController.searchTeachers);

module.exports = router;
