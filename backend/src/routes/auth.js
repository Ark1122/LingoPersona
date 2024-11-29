const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create({ email, password, name });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;