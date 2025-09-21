const { Op } = require('sequelize');
const Module = require('../models/module.model');
const Grade = require('../models/grade.model');
const Teacher = require('../models/teacher.model');
const User = require('../models/user.model');
const Cour = require('../models/cour.model')
const Resource =require('../models/resource.model')
const File = require('../models/file.model')
// Create a new module
const createModule = async (req, res) => {
  try {
    const { Name, Description, gradeId, teacherId } = req.body;

    if (!Name || !gradeId || !teacherId) {
      return res.status(400).json({ error: "Name, gradeId, and teacherId are required" });
    }

    // Check teacher exists
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Check grade exists
    const grade = await Grade.findByPk(gradeId);
    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    // Create module
    const module = await Module.create({ Name, Description, gradeId, teacherId });

    // Return module with relations
    const newModule = await Module.findByPk(module.id, {
      include: [
        {
          model: Teacher,
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all modules
const getAllModules = async (req, res) => {
  try {
    const modules = await Module.findAll({
      include: [
        {
          model: Teacher,
          as: "mainTeacher",  // main teacher
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        {
          model:Cour,
          as:"Cours",
          attributes: ["id","Name","Description"]
        },
        {
          model: Teacher,
          as: "Teachers",     // co-teachers
          through: { attributes: [] }, // hide join table
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllModulesByteacherId = async (req, res) => {
  try {
    const { teacherId } = req.params; // assuming you pass it like /modules/:teacherId

    const modules = await Module.findAll({
      include: [
        {
          model: Teacher,
          as: "mainTeacher",  // main teacher
          include: [
            { model: User, 
              where: { id: teacherId },
            attributes: ["id", "firstName", "lastName", "email"] }
          ]
        },
        {
          model: Teacher,
          as: "Teachers",     // co-teachers
          through: { attributes: [] }, // hide join table
          include: [
            { model: User, attributes: ["id", "firstName", "lastName", "email"] }
          ]
        },
        {
          model:Cour,
          as:"Cours",
          attributes: ["id","Name","Description"],
          include: [
            {
              model: File,
              attributes: ["id", "name","link"],
            },
          ],
        },
        {
          model:Resource,
          as:"Resources",
          attributes:["id","Name","Link","Type"]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });

    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get module by ID
const getModuleById = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id, {
      include: [
        {
          model: Teacher,
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Search modules by name or description
const searchModules = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({ error: "Search term is required" });
    }

    const modules = await Module.findAll({
      where: {
        [Op.or]: [
          { Name: { [Op.like]: `%${term}%` } },
          { Description: { [Op.like]: `%${term}%` } }
        ]
      },
      include: [
        {
          model: Teacher,
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });

    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update module
const updateModule = async (req, res) => {
  try {
    const { Name, Description, gradeId, teacherId } = req.body;
    const module = await Module.findByPk(req.params.id);

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    module.Name = Name || module.Name;
    module.Description = Description || module.Description;
    module.gradeId = gradeId || module.gradeId;
    module.teacherId = teacherId || module.teacherId;

    await module.save();

    const updated = await Module.findByPk(module.id, {
      include: [
        {
          model: Teacher,
          include: [{ model: User, attributes: ["id", "firstName", "lastName", "email"] }]
        },
        { model: Grade, attributes: ["id", "name"] }
      ]
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete module
const deleteModule = async (req, res) => {
  try {
    const module = await Module.findByPk(req.params.id);

    await module.destroy();
    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  searchModules,
  updateModule,
  deleteModule,
  getAllModulesByteacherId
};
