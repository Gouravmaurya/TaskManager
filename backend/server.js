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
// Configure CORS to allow requests from any origin
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    // Reflect the request origin, as it is the safest way to handle credentials
    callback(null, origin);
  },
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
