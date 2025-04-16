const Feedback = require('../models/Feedback');

// Feedback controller
const feedbackController = {
  // Submit new feedback
  submit: async (req, res) => {
    try {
      const { category, comments } = req.body;
      const userId = req.user._id;

      const feedback = new Feedback({
        userId,
        category,
        comments
      });

      await feedback.save();

      res.status(201).json({
        message: 'Feedback submitted successfully',
        data: feedback
      });
    } catch (error) {
      console.error('Feedback submission error:', error);
      res.status(500).json({ message: 'Error submitting feedback' });
    }
  },

  // Get all feedbacks for the current user
  getUserFeedbacks: async (req, res) => {
    try {
      const feedbacks = await Feedback.find({ userId: req.user._id })
        .sort({ createdAt: -1 });

      res.status(200).json({
        data: feedbacks
      });
    } catch (error) {
      console.error('Get feedbacks error:', error);
      res.status(500).json({ message: 'Error fetching feedbacks' });
    }
  }
};

module.exports = feedbackController;