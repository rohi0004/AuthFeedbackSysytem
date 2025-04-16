const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: [
      'General Queries',
      'Product Features Queries',
      'Product Pricing Queries',
      'Product Feature Implementation Requests'
    ]
  },
  comments: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;