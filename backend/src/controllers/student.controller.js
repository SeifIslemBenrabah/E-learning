// controllers/student.controller.js
const { Op } = require('sequelize');
const Student = require('../models/student.model');
const User = require('../models/user.model');
const Promo = require('../models/promo.model');
const Grade = require('../models/grade.model');
const bcrypt = require('bcrypt');
const { createUser } = require("./user.controller");
const csv = require("csv-parser");
const fs = require("fs");

// Create one student with user
const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, studentId, promoId } = req.body;

    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
      role: "student"
    });

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

          const user = await createUser({
            firstName,
            lastName,
            email,
            password,
            role: "student"
          });

          const student = await Student.create({
            studentId,
            promoId,
            userId: user.id
          });

          created.push({ user, student });
        }

        fs.unlinkSync(req.file.path);
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
      const user = await createUser({
        firstName: s.firstName,
        lastName: s.lastName,
        email: s.email,
        password: s.password,
        role: "student"
      });

      // Fixed: use promoId (not promo)
      const student = await Student.create({
        studentId: s.studentId,
        promoId: s.promoId,
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
        { model: User, attributes: { exclude: ['password'] } },
        {
          model: Promo,
          include: [{ model: Grade }]
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
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: User, attributes: { exclude: ['password'] } }]
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student by userId (users table PK)
const getStudentByUserId = async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { userId: req.params.userId },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Promo, include: [{ model: Grade }] }
      ]
    });
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
        attributes: { exclude: ['password'] },
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

// Update student by ID — hashes password if provided, uses promoId
const updateStudent = async (req, res) => {
  try {
    const { firstName, lastName, email, password, studentId, promoId } = req.body;
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: User }]
    });

    if (!student) return res.status(404).json({ error: 'Student not found' });

    if (student.User) {
      const userUpdates = { firstName, lastName, email };
      if (password) {
        userUpdates.password = await bcrypt.hash(password, 10);
      }
      await student.User.update(userUpdates);
    }

    // Fixed: use promoId (not promo)
    await student.update({ studentId, promoId });

    const { password: _, ...userData } = student.User.get({ plain: true });
    res.json({ user: userData, student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete student by ID
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id, {
      include: [{ model: User }]
    });
    if (!student) return res.status(404).json({ error: 'Student not found' });

    if (student.User) await student.User.destroy();
    await student.destroy();

    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudent,
  createManyStudents,
  getAllStudents,
  getStudentById,
  getStudentByUserId,
  searchStudents,
  updateStudent,
  deleteStudent,
  uploadStudents
};
