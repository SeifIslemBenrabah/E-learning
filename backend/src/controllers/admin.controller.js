const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const { createUser } = require("../controllers/user.controller");

const ADMIN_EMAIL = "admin@esi-sba.dz";
const ADMIN_PASSWORD = "admin"; // you can load from .env later

const initAdmin = async () => {
  try {
    let user = await User.findOne({ where: { email: ADMIN_EMAIL } });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

      user = await User.create({
        firstName: "Seif Islem",
        lastName: "Benrabah",
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "admin"
      });

      await Admin.create({ userId: user.id });

      console.log("Admin initialized");
    } else {
      console.log("Admin already exists");
    }
  } catch (err) {
    console.error("Error initializing admin:", err);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.role !== "admin") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.json({ message: "Admin logged in", token });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


module.exports = { initAdmin, loginAdmin };
