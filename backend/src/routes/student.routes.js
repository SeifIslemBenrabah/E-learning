// routes/student.routes.js
const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const studentController = require('../controllers/student.controller');

router.post('/', studentController.createStudent);
router.post('/bulk', studentController.createManyStudents);
router.post("/upload", upload.single("file"), studentController.uploadStudents);
router.get('/', studentController.getAllStudents);
router.get('/search', studentController.searchStudents);
router.get('/:id', studentController.getStudentById);

router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
