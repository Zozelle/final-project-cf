const express = require('express');
const Cat = require('../models/Cat');
const router = express.Router();

router.get('/', async (req, res) => {
  const cats = await Cat.find();
  res.json(cats);
});

router.post('/', async (req, res) => {
  try {
    const cat = new Cat(req.body);
    const savedCat = await cat.save();
    res.status(201).json(savedCat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
