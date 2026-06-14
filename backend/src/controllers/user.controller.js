const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Get all users (password excluded)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Create new user (used as a utility by other controllers)
async function createUser({ firstName, lastName, email, password, role }) {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role
  });

  const { password: _, ...userData } = user.get({ plain: true });
  return userData;
}

// Register route handler wrapper
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const userData = await createUser({ firstName, lastName, email, password, role });
    res.status(201).json(userData);
  } catch (err) {
    if (err.message === "Email already in use") {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// Update user — explicit allowlist prevents mass-assignment
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { firstName, lastName, email } = req.body;
    await user.update({ firstName, lastName, email });

    const { password: _, ...userData } = user.get({ plain: true });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// Login — verifies password, includes user id in JWT payload
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const lowerEmail = email.toLowerCase();
    const user = await User.findOne({ where: { email: lowerEmail } });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { id: user.id, firstname: user.firstName, lastname: user.lastName, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = user.get({ plain: true });
    return res.json({ accessToken, user: userData });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
  loginUser
};
