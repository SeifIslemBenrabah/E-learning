const express = require('express');
const router = express.Router();
const { getConversation, getTeacherContacts, getStudentContacts } = require('../controllers/message.controller');

router.get('/conversation/:userId1/:userId2', getConversation);
router.get('/contacts/teacher/:userId', getTeacherContacts);
router.get('/contacts/student/:userId', getStudentContacts);

module.exports = router;
