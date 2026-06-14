// routes/quiz.routes.js
const express = require("express");
const { createQuiz, addQuestion, getQuiz, getQuizzesByCourse, submitQuiz } = require("../controllers/quiz.controller");
const router = express.Router();

router.post("/", createQuiz);
router.post("/question", addQuestion);
router.get("/course/:courId", getQuizzesByCourse);
router.get("/:id", getQuiz);
router.post("/submit", submitQuiz);

module.exports = router;
