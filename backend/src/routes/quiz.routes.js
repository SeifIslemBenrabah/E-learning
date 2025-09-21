// routes/quiz.routes.js
const express = require("express");
const { createQuiz, addQuestion, getQuiz, submitQuiz } = require("../controllers/quiz.controller");
const router = express.Router();

router.post("/", createQuiz); // prof
router.post("/question", addQuestion); // prof
router.get("/:id", getQuiz); // tous
router.post("/submit", submitQuiz); // etudiant

module.exports = router;
