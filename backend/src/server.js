const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const catRoutes = require('./routes/catRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/catcafe')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Register routes
app.use('/users', userRoutes);
app.use('/cats', catRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);

// Root endpoint for basic API information
app.get('/', (req, res) => {
  res.send('Welcome to the Cat Cafe API!');
});

// Centralized error handling middleware
app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
