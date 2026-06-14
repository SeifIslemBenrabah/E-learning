const { Op } = require('sequelize');
const Message = require('../models/message.model');
const User = require('../models/user.model');
const Student = require('../models/student.model');
const Teacher = require('../models/teacher.model');
const Module = require('../models/module.model');
const Promo = require('../models/promo.model');

// Conversation history between two users
const getConversation = async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId1, receiverId: userId2 },
          { senderId: userId2, receiverId: userId1 }
        ]
      },
      order: [['createdAt', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Students enrolled in modules taught by this teacher
const getTeacherContacts = async (req, res) => {
  try {
    const { userId } = req.params;

    const teacher = await Teacher.findOne({ where: { userId } });
    if (!teacher) return res.json([]);

    const modules = await Module.findAll({ where: { teacherId: teacher.id } });
    const gradeIds = [...new Set(modules.map(m => m.gradeId).filter(Boolean))];
    if (gradeIds.length === 0) return res.json([]);

    const promos = await Promo.findAll({ where: { gradeId: gradeIds } });
    const promoIds = promos.map(p => p.id);
    if (promoIds.length === 0) return res.json([]);

    const students = await Student.findAll({
      where: { promoId: promoIds },
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'email'] }]
    });

    res.json(students.map(s => s.User).filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Teachers of modules in the student's grade
const getStudentContacts = async (req, res) => {
  try {
    const { userId } = req.params;

    const student = await Student.findOne({
      where: { userId },
      include: [{ model: Promo }]
    });
    if (!student?.Promo) return res.json([]);

    const modules = await Module.findAll({ where: { gradeId: student.Promo.gradeId } });
    const teacherIds = [...new Set(modules.map(m => m.teacherId).filter(Boolean))];
    if (teacherIds.length === 0) return res.json([]);

    const teachers = await Teacher.findAll({
      where: { id: teacherIds },
      include: [{ model: User, attributes: ['id', 'firstName', 'lastName', 'email'] }]
    });

    res.json(teachers.map(t => t.User).filter(Boolean));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getConversation, getTeacherContacts, getStudentContacts };
