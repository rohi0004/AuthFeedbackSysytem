require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware

const allowedOrigins = [
  'https://auth-feedback-sysytem-qkq8.vercel.app',
  'http://localhost:5173',
]

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
)

app.use(express.json())
app.use(cookieParser())
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Connect to MongoDB
mongoose.connect(process.env.URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
