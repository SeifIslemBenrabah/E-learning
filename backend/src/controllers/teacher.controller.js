const Teacher = require("../models/teacher.model");
const User = require("../models/user.model");
const Module = require("../models/module.model");
const { createUser } = require("./user.controller");

const { Op } = require('sequelize');
// Create a new teacher
const createTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password, type,status} = req.body;

    // 1. Create the user (role = teacher)
    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
      role: "teacher"
    });

    // 2. Create teacher profile linked to user
    const teacher = await Teacher.create({
      type,
      status,
      userId: user.id
    });

    res.status(201).json({ user, teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll({
      include: [
        { model: User, attributes: ["id", "firstName", "lastName", "email"] },
        { model: Module, attributes: ["id", "Name"] }
      ]
    });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get teacher by ID
const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["id", "firstName", "lastName", "email"] },
        { model: Module, attributes: ["id", "Name", "Description"] }
      ]
    });

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update teacher
// Update teacher (and linked user)
const updateTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password, type, status } = req.body;

    // Find teacher with user included
    const teacher = await Teacher.findByPk(req.params.id, { include: User });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    // Update Teacher fields
    teacher.type = type ?? teacher.type;
    teacher.status = status ?? teacher.status;
    await teacher.save();

    // Update linked User
    if (teacher.User) {
      teacher.User.firstName = firstName ?? teacher.User.firstName;
      teacher.User.lastName = lastName ?? teacher.User.lastName;
      teacher.User.email = email ?? teacher.User.email;
      if (password) teacher.User.password = password; // ⚠️ hash if needed
      await teacher.User.save();
    }

    res.json({ message: "Teacher updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete teacher
// Delete teacher (and linked user)
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });

    // Get linked user
    const user = await User.findByPk(teacher.userId);

    // Delete teacher first
    await teacher.destroy();

    // Then delete linked user
    if (user) await user.destroy();

    res.json({ message: "Teacher and linked user deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Search Teachers
const searchTeachers = async (req, res) => {
  try {
    const { query } = req.query; // ?query=math

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const teachers = await Teacher.findAll({
      where: {
        [Op.or]: [
          { type: { [Op.like]: `%${query}%` } }
        ]
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'email'], // adjust based on your User model
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: `%${query}%` } },
              { lastName: { [Op.like]: `%${query}%` } },
              { email: { [Op.like]: `%${query}%` } }
            ]
          },
          required: false
        },
        {
          model: Module,
          attributes: ['id', 'Name', 'Description'],
          through: { attributes: [] } // hides join table data
        }
      ]
    });

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error searching teachers:", error);
    res.status(500).json({ error: "Failed to search teachers" });
  }
};
module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  searchTeachers
};
