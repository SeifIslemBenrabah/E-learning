// controllers/cour.controller.js
//const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");
const Cour = require("../models/cour.model");
const File = require("../models/file.model");
const Module = require('../models/module.model');

// Create a new cour
const createCour = async (req, res) => {
  const t = await Cour.sequelize.transaction();
  try {
    const body = { ...req.body };
    const { Name, Description, moduleId } = body;

    // 1. Create course
    const cour = await Cour.create({ 
      Name: Name,
      Description: Description,
      moduleId: parseInt(moduleId, 10) }, 
      { transaction: t });

    // 2. Handle files if uploaded
    if (req.files && req.files.length > 0) {
      // Ensure uploads folder exists
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      for (const file of req.files) {
        // Sanitize filename to prevent path traversal
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
        const uniqueName = Date.now() + "-" + safeName;
        const filePath = path.join(uploadDir, uniqueName);

        fs.writeFileSync(filePath, file.buffer);

        await File.create(
          {
            name: file.originalname,
            link: `uploads/${uniqueName}`,
            courId: cour.id,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    res.status(201).json({ msg: "Course created with files!", cour });
  } catch (error) {
    await t.rollback();
    console.error("Transaction failed:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all cours with their modules
const getAllCours = async (req, res) => {
  try {
    const cours = await Cour.findAll({
      include: [{ model: Module, attributes: ['id', 'Name'] }]
    });
    res.json(cours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single cour by ID
const getCourById = async (req, res) => {
  try {
    const { id } = req.params;
    const cour = await Cour.findByPk(id, {
      include: [
        { model: Module, attributes: ['id', 'Name'] },
        { model: File, attributes: ['id', 'name', 'link'] }
      ]
    });

    if (!cour) {
      return res.status(404).json({ message: 'Cour not found' });
    }

    res.json(cour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cour
// Update a cour
const updateCour = async (req, res) => {
  const t = await Cour.sequelize.transaction();
  try {
    const { id } = req.params;
    const { Name, Description, moduleId } = req.body;

    const cour = await Cour.findByPk(id, { include: [File] });
    if (!cour) {
      await t.rollback();
      return res.status(404).json({ message: 'Cour not found' });
    }

    // Update cour fields
    await cour.update({ Name, Description, moduleId }, { transaction: t });

    // If new files are uploaded, remove old ones first
    if (req.files && req.files.length > 0) {
      // Delete old files from DB and disk
      for (const f of cour.Files) {
        const oldPath = path.join(__dirname, "..", f.link);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
        await f.destroy({ transaction: t });
      }

      // Save new files
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }

      for (const file of req.files) {
        const safeName = path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
        const uniqueName = Date.now() + "-" + safeName;
        const filePath = path.join(uploadDir, uniqueName);
        fs.writeFileSync(filePath, file.buffer);

        await File.create(
          {
            name: file.originalname,
            link: `uploads/${uniqueName}`,
            courId: cour.id,
          },
          { transaction: t }
        );
      }
    }

    await t.commit();
    res.json({ message: "Cour updated successfully", cour });
  } catch (error) {
    await t.rollback();
    console.error("Update failed:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a cour
const deleteCour = async (req, res) => {
  const t = await Cour.sequelize.transaction();
  try {
    const { id } = req.params;
    const cour = await Cour.findByPk(id, { include: [File] });

    if (!cour) {
      await t.rollback();
      return res.status(404).json({ message: 'Cour not found' });
    }

    // Delete related files (from disk + DB)
    for (const f of cour.Files) {
      const filePath = path.join(__dirname, "..", f.link);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await f.destroy({ transaction: t });
    }

    // Delete the cour
    await cour.destroy({ transaction: t });

    await t.commit();
    res.json({ message: 'Cour and its files deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error("Delete failed:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCour,
  getAllCours,
  getCourById,
  updateCour,
  deleteCour,
};
