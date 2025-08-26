const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const catsRouter = require('./routes/cats');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/catcafe')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use('/cats', catsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Cat Cafe API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
