// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.Mongo_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Database Connection error: ${err}`));

// -------------------- Schemas & Models --------------------
// Simple user info model
const MySchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String
});
const Model = mongoose.model('Model', MySchema);

// User authentication model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const UserModel = mongoose.model("UserModel", UserSchema);

// -------------------- Routes --------------------

// GET all users
app.get('/get', async (req, res) => {
  try {
    const ans = await Model.find();
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Add new user
app.post('/add', async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const newUser = new Model({ name, email, number });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Delete user by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await Model.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// Update user by ID
app.put('/update/:id', async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const updatedUser = await Model.findByIdAndUpdate(
      req.params.id,
      { name, email, number },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// -------------------- Auth Routes --------------------

// Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const check = await UserModel.findOne({ email });
    if (check) return res.status(400).send('User already exists');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(200).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token, email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Profile route (protected)
app.get('/profile', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing, login required' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    res.status(200).json({ message: 'success', user });
  });
});

// -------------------- Start Server --------------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
