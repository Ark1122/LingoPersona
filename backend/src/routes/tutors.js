const express = require('express');
const router = express.Router();
const { Tutor } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  try {
    const tutorData = { ...req.body, userId: req.user.id };
    const tutor = await Tutor.create(tutorData);
    res.json(tutor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tutors = await Tutor.findAll({ where: { userId: req.user.id } });
    res.json(tutors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;