const express = require('express');
const router = express.Router();
const SessionController = require('../controllers/SessionController');
const auth = require('../middleware/auth');
const { conversationLimiter } = require('../middleware/rateLimit');

router.post('/', auth, conversationLimiter, SessionController.create);
router.put('/:session_id/end', auth, SessionController.end);
router.get('/stats', auth, SessionController.getUserStats);

module.exports = router;