const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/catcafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Cat Schema & Model
const catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  description: String,
  photoUrl: String,
});

const Cat = mongoose.model('Cat', catSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Cat Cafe API');
});

// Get all cats
app.get('/cats', async (req, res) => {
  try {
    const cats = await Cat.find();
    res.json(cats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new cat
app.post('/cats', async (req, res) => {
  const cat = new Cat(req.body);
  try {
    const newCat = await cat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
