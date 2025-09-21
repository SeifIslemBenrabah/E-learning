// controllers/student.controller.js
const { Op } = require('sequelize');
const Student = require('../models/student.model');
const User = require('../models/user.model');
const Promo = require('../models/promo.model')
const Grade = require('../models/grade.model')
const { createUser } = require("./user.controller");
const csv = require("csv-parser");
const fs = require("fs");
// Create one student with user
// const createStudent = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password, studentId, promo } = req.body;

//     const user = await User.create({ firstName, lastName, email, password, role: "student" });
//     const student = await Student.create({ studentId, promo, userId: user.id });

//     res.status(201).json({ user, student });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, studentId, promoId } = req.body;

    // 1. Create the user (role = student)
    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
      role: "student"
    });

    // 2. Create the student profile linked to user
    const student = await Student.create({ studentId, promoId, userId: user.id });

    res.status(201).json({ user, student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Upload students via CSV
const uploadStudents = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      try {
        const created = [];

        for (const row of results) {
          const { firstName, lastName, email, password, studentId, promoId } = row;

          // 1. Create user
          const user = await createUser({
            firstName,
            lastName,
            email,
            password,
            role: "student"
          });

          // 2. Create student profile
          const student = await Student.create({
            studentId,
            promoId,
            userId: user.id
          });

          created.push({ user, student });
        }

        fs.unlinkSync(req.file.path); // clean uploaded file
        res.json({ message: "CSV import successful", count: created.length, data: created });
      } catch (err) {
        console.error("Insert error:", err);
        res.status(500).json({ error: err.message });
      }
    });
};

// Create many students in bulk
const createManyStudents = async (req, res) => {
  try {
    const studentsData = req.body; 
    const created = [];

    for (const s of studentsData) {
      // 1. Create the user (role = student)
      const user = await createUser({
        firstName: s.firstName,
        lastName: s.lastName,
        email: s.email,
        password: s.password,
        role: "student"
      });

      // 2. Create the student profile
      const student = await Student.create({
        studentId: s.studentId,
        promo: s.promo,
        userId: user.id
      });

      created.push({ user, student });
    }

    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include: [
        { model: User }, // include user info
        {
          model: Promo,
          include: [
            { model: Grade } // include grade inside promo
          ]
        }
      ]
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get student by ID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: User });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search students by firstName or lastName
const searchStudents = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Search query is required" });

    const students = await Student.findAll({
      include: {
        model: User,
        where: {
          [Op.or]: [
            { firstName: { [Op.like]: `%${q}%` } },
            { lastName: { [Op.like]: `%${q}%` } }
          ]
        }
      }
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update student by ID
const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, studentId, promo } = req.body;
    const student = await Student.findByPk(req.params.id, { include: User });

    if (!student) return res.status(404).json({ error: 'Student not found' });

    if (student.User) {
      await student.User.update({ firstName, lastName, email, password });
    }

    await student.update({ studentId, promo });

    res.json({ user: student.User, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, { include: User });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    await student.destroy();
    if (student.User) await student.User.destroy();

    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all at the bottom
module.exports = {
  createStudent,
  createManyStudents,
  getAllStudents,
  getStudentById,
  searchStudents,
  updateStudent,
  deleteStudent,
  uploadStudents
};
