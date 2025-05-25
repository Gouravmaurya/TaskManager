const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const User = require('../models/User'); // Adjust the path as needed
// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: { _id: newUser._id, username, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
    try {
      console.log('Login attempt with:', { email: req.body.email });
      
      const { email, password } = req.body;
  
      if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Please provide email and password' });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found with email:', email);
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('User found:', { id: user._id, username: user.username });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('Password mismatch for user:', user._id);
        return res.status(400).json({ message: 'Invalid password' });
      }
      console.log('Password matched successfully');
  
      // Generate token
      try {
        if (!process.env.JWT_SECRET) {
          console.error('JWT_SECRET is not defined');
          return res.status(500).json({ message: 'Token generation failed: Server configuration error' });
        }
        
        const token = generateToken(user._id);
        if (!token) {
          console.error('Token generation failed');
          return res.status(500).json({ message: 'Error generating authentication token' });
        }
        console.log('Token generated successfully');
        
        // Send response with token and user info
        return res.json({ 
          message: 'Login successful', 
          token, 
          user: { 
            _id: user._id, 
            username: user.username, 
            email: user.email 
          } 
        });
      } catch (tokenErr) {
        console.error('Token generation error:', tokenErr);
        return res.status(500).json({ message: 'Invalid token generation' });
      }
    } catch (err) {
      console.error('Login route error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// @route   GET /api/users
// @desc    Get all users (only _id, username, email)
// @access  Public (can make private later)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, '_id username email');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get a user by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '_id username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
