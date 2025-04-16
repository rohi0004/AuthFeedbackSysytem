const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const checkAuth = require('../middlewares/checkAuth');

// Protect all feedback routes
router.use(checkAuth);

// Submit feedback
router.post('/submit', feedbackController.submit);

// Get user's feedbacks
router.get('/user-feedbacks', feedbackController.getUserFeedbacks);

module.exports = router;