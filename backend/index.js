const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');


const PORT = 3001;
const app = express();
const Sceret_Key = "FaizanIsGreat"

// Middleware to parse JSON body
app.use(express.json());
app.use(cors())

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/Notebook")
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Database Connection error: ${err}`));

// Schema & Model
const MySchema = new mongoose.Schema({
  name: String,
  email: String,
  number: String
});
const NoteUserSchema = mongoose.Schema({
    email : String,
    password : String

})

const Model = mongoose.model('model', MySchema);
const UserModel = mongoose.model("UserModel",NoteUserSchema);

// ✅ GET Route to fetch all users
app.get('/get', async (req, res) => {
  try {
    const ans = await Model.find();
    res.json(ans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ POST Route to Add a New User
app.post('/add', async (req, res) => {
  try {
    const { name, email, number } = req.body;

    const newUser = new Model({ name, email, number });

    await newUser.save();
    res.status(201).json(newUser); // ✅ you were sending undefined variable `newUser`
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

// ✅ DELETE Route to delete by ID (use DELETE method)
app.delete('/delete/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const deletedUser = await Model.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
  
     res.status(404).json({ error: "User not found" });
    };
     
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

// ✅ PUT Route to update by ID
app.put('/update/:id', async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const updatedUser = await Model.findByIdAndUpdate(
      req.params.id,
      { name, email, number },
      { new: true } // returns the updated document
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.post('/register', async (req, res)=>{
    const { email, password} = req.body;
    
    try{
      const check = await UserModel.findOne({email})

      if (check){
        return res.status(400).send('user already exists')
      }
      
      const newUser = new UserModel({email,password});
      await newUser.save();
      res.status(200).send('user regitered successfully');

    }
    catch(err){
      res.status(500 ).send("something gets wrong over there");

    }

});
// Example: login route in Express.js
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
     
    const token = jwt.sign({id:user._id},Sceret_Key,{expiresIn:'1h'});
    res.status(200).json({token:token,email:user.email});
  } catch (err) {
    console.log("Login error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});
app.get('/Profile', async (req, res) => {
  // Headers me "authorization" lowercase me hota hai
  const authHeader = req.headers['authorization'];

  // Token extract karo "Bearer <token>" format me se
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Token missing, login required' });
  }

  // Token verify karo
  jwt.verify(token, "FaizanIsGreat", (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Success response
    res.status(200).json({
      message: 'success',
      user: user
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
