const express = require("express");
const { loginAdmin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/login", loginAdmin);

module.exports = router;
