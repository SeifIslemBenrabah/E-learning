// controllers/quiz.controller.js
const Quiz = require("../models/quiz.model");
const Question = require("../models/question.model");
const Answer = require("../models/answer.model");
const Result = require("../models/result.model");

const createQuiz = async (req, res) => {
  try {
    // if (req.user.role !== "teacher")
    //   return res.status(403).json({ error: "Only teachers can create quizzes" });

    const { courId, title } = req.body;
    const quiz = await Quiz.create({ courId, title });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    // if (req.user.role !== "teacher")
    //   return res.status(403).json({ error: "Only teachers can add questions" });

    const { quizId, text, answers } = req.body;
    const question = await Question.create({ quizId, text });

    if (answers) {
      for (let ans of answers) {
        await Answer.create({
          text: ans.text,
          isCorrect: ans.isCorrect,
          questionId: question.id,
        });
      }
    }

    res.json({ question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: { model: Question, include: [Answer] },
    });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    // if (req.user.role !== "student")
    //   return res.status(403).json({ error: "Only students can submit quizzes" });

    const { quizId, answers } = req.body;
    const questions = await Question.findAll({
      where: { quizId },
      include: [Answer],
    });

    let score = 0;
    for (let q of questions) {
      const correctAnswer = q.Answers.find((a) => a.isCorrect);
      const userAnswer = answers.find((a) => a.questionId === q.id);
      if (userAnswer && userAnswer.answerId === correctAnswer.id) {
        score++;
      }
    }

    const result = await Result.create({
      studentId: req.user.id,
      quizId,
      score,
      total: questions.length,
    });

    res.json({ score, total: questions.length, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createQuiz, addQuestion, getQuiz, submitQuiz };
