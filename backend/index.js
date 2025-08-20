const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Atlas se connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // ⚠️ latest driver me ye options zaroori nahi hai
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

// ✅ Schemas
const MySchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
});

const NoteUserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const Model = mongoose.model('model', MySchema);
const UserModel = mongoose.model('UserModel', NoteUserSchema);

// ✅ CRUD Routes
app.get('/get', async (req, res) => {
  try {
    const ans = await Model.find();
    res.json(ans);
  } catch {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const newUser = new Model({ name, email, number });
    await newUser.save();
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: "Failed to save user" });
  }
});

app.delete('/delete/:id', async (req, res) => {
  try {
    const deletedUser = await Model.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Deleted successfully" });
  } catch {
    res.status(500).json({ error: "Error deleting user" });
  }
});

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
  } catch {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ Auth Routes
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await UserModel.findOne({ email });
    if (check) return res.status(400).send('User already exists');

    const newUser = new UserModel({ email, password });
    await newUser.save();
    res.status(200).send('User registered successfully');
  } catch {
    res.status(500).send("Something went wrong");
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });
    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing, login required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.status(200).json({ message: 'success', user });
  });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
