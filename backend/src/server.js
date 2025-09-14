const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./db');

const userRoutes = require('./routes/userRoutes');
const catRoutes = require('./routes/catRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const authRoutes = require('./routes/authRoutes');

const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, '../public/images')));

app.use('/users', userRoutes);
app.use('/cats', catRoutes);
app.use('/reservations', reservationRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Cat Cafe API!');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});