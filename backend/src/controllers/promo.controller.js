const Promo = require("../models/promo.model")
const Grade = require('../models/grade.model');
const Student = require('../models/student.model')
const { fn, col } = require("sequelize");
// Create Promo
const createPromo = async (req, res) => {
  try {
    const { promoName, gradeId, specialty } = req.body;

    const grade = await Grade.findByPk(gradeId);
    if (!grade) {
      return res.status(404).json({ error: "Grade not found" });
    }

    const promo = await Promo.create({ promoName, gradeId, specialty });
    res.status(201).json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Promos
const getPromos = async (req, res) => {
  try {
    const promos = await Promo.findAll({
      attributes: {
        include: [
          [fn("COUNT", col("Students.id")), "studentCount"], // count students
        ],
      },
      include: [{ model: Grade, attributes: ["id", "name","specialty"] },
      {
        model: Student,
        attributes: [], // we don’t need student details, only count
      },
    ],
    group: ["Promo.id", "Grade.id"], 
    });
    res.status(200).json(promos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Promo by ID
const getPromoById = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promo.findByPk(id, {
      include: [{ model: Grade, attributes: ["id", "gradeName"] }],
    });

    if (!promo) {
      return res.status(404).json({ error: "Promo not found" });
    }

    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Promo
const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const { promoName, gradeId } = req.body;

    const promo = await Promo.findByPk(id);
    if (!promo) {
      return res.status(404).json({ error: "Promo not found" });
    }

    if (gradeId) {
      const grade = await Grade.findByPk(gradeId);
      if (!grade) {
        return res.status(404).json({ error: "Grade not found" });
      }
    }

    await promo.update({ promoName, gradeId });
    res.status(200).json(promo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Promo
const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promo.findByPk(id);

    if (!promo) {
      return res.status(404).json({ error: "Promo not found" });
    }

    await promo.destroy();
    res.status(200).json({ message: "Promo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controllers
module.exports = {
  createPromo,
  getPromos,
  getPromoById,
  updatePromo,
  deletePromo,
};
