require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import environment check utility
const { checkEnv } = require('./utils/env-check');

// Routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');

const app = express();
// Configure CORS to allow requests from frontend domain
// Import custom CORS middleware
const corsMiddleware = require('./middlewares/cors');

// Apply CORS middleware first (before any route handlers)
app.use(corsMiddleware);

// Also use the cors package for additional protection
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Route middleware
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

// Add diagnostic route for environment variables
app.get('/api/system/env-check', (req, res) => {
  const envStatus = checkEnv();
  res.json({
    status: envStatus.allPresent ? 'OK' : 'Missing Variables',
    details: envStatus
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Log environment status on startup
  const envStatus = checkEnv();
  console.log('Environment variables status:', envStatus);
});
