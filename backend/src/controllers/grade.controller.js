const Grade = require('../models/grade.model');

// Create a new grade
const createGrade = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const grade = await Grade.create({ name });
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 

const initgrades = async () => {
  try {
    // Grades without specialty
    const baseGrades = ["1CP", "2CP", "1CS"];
    for (const name of baseGrades) {
      await Grade.findOrCreate({
        where: { name, specialty: null },
        defaults: { name, specialty: null },
      });
    }

    // Grades with specialties
    const specialties = ["SIW", "ISI", "IA"];
    const advancedGrades = ["2CS", "3CS"];

    for (const grade of advancedGrades) {
      for (const specialty of specialties) {
        await Grade.findOrCreate({
          where: { name: grade, specialty },
          defaults: { name: grade, specialty },
        });
      }
    }

    console.log({ message: "Grades initialized successfully" });
  } catch (err) {
    console.error("Error initializing grades:", err);
  }
};




// Get all grades
const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a grade by ID
const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a grade
const updateGrade = async (req, res) => {
  try {
    const { name } = req.body;
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    grade.name = name || grade.name;
    await grade.save();

    res.json(grade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a grade
const deleteGrade = async (req, res) => {
  try {
    const grade = await Grade.findByPk(req.params.id);

    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    await grade.destroy();
    res.json({ message: "Grade deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGrade,
  deleteGrade,
  initgrades
};
