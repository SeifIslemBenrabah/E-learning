const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// Create new user
async function createUser({ firstName, lastName, email, password, role }) {
  // 1. Check if email already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  // 2. Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create the user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role
  });

  // Don't return password in the response
  const { password: _, ...userData } = user.get({ plain: true });

  return userData;
}

// Update user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(req.body);
    res.status(200).json(user);
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

const loginUser = async (req, res) => {
  try {
      const lowerEmail = req.body.email.toLowerCase();
      const user = await User.findOne({ where: { email: lowerEmail } });

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      

      const accessToken = jwt.sign(
          { firstname: user.firstName, lastname: user.lastName,role: user.role }, 
          process.env.ACCESS_TOKEN_SECRET, 
          { expiresIn: "1h" }
      );

      return res.json({ accessToken ,user:user });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: `Server error: ${err.message}` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
