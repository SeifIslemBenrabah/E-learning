const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const { createUser } = require("../controllers/user.controller");

const initAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env — skipping admin init");
      return;
    }

    let user = await User.findOne({ where: { email: adminEmail } });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      user = await User.create({
        firstName: "Admin",
        lastName: "User",
        email: adminEmail,
        password: hashedPassword,
        role: "admin"
      });

      await Admin.create({ userId: user.id });
      console.log("Admin initialized");
    } else {
      // Always sync password from env so a changed ADMIN_PASSWORD takes effect on restart
      const passwordUpToDate = await bcrypt.compare(adminPassword, user.password);
      if (!passwordUpToDate) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(adminPassword, salt);
        await user.save();
        console.log("Admin password updated from env");
      } else {
        console.log("Admin already exists");
      }
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

    // Use the same secret as the rest of the app
    const token = jwt.sign(
      { id: user.id, role: "admin" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Admin logged in", token });
  } catch (err) {
    return res.status(500).json({ message: "Error logging in", error: err.message });
  }
};

module.exports = { initAdmin, loginAdmin };
