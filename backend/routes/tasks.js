const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const mongoose = require('mongoose');
const auth = require('../middlewares/auth'); // Import auth middleware
const router = express.Router();

// Create a task
router.post('/', auth, async (req, res) => {
  try {
    let { title, description, dueDate, priority, status, assignedTo, createdBy } = req.body; // assignedTo is now expected as a String (name)

    // --- Debugging Start ---
    console.log('Received Task Creation Request Body:', req.body);
    console.log('Received assignedTo Name:', assignedTo); // Log the name
    console.log('Received createdBy ID:', createdBy);
    // --- Debugging End ---

    // Basic Validation - assignedTo is now a string name
    if (!title || !description || !dueDate || !priority || !status || !assignedTo || !createdBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Removed assignedTo ObjectId validation
    // if (!mongoose.Types.ObjectId.isValid(assignedTo)) { ... }

    // Validate createdBy ID
    if (!mongoose.Types.ObjectId.isValid(createdBy)) {
      console.error('Validation Error: Invalid createdBy ID format:', createdBy); // Added log
      return res.status(400).json({ message: 'Invalid creator user ID format' });
    }

    // Removed check if assignedUser exists by ID
    // const assignedUser = await User.findById(assignedTo);
    // if (!assignedUser) { ... }

    // Check if creator user exists (good practice)
    const creatorUser = await User.findById(createdBy);
     // --- Debugging Start ---
    console.log('Looked up creatorUser by ID:', createdBy, ' Found:', creatorUser ? creatorUser.username : 'Not Found');
    // --- Debugging End ---
    if (!creatorUser) {
      return res.status(400).json({ message: 'Creator user does not exist' });
    }

    // assignedTo is now stored directly as a string
    const task = new Task({ title, description, dueDate, priority, status, assignedTo, createdBy });
    await task.save();

    // Populate only the createdBy field for the response
    const populatedTask = await Task.findById(task._id)
                                    .populate('createdBy', 'username email');
                                    // Removed .populate('assignedTo', ...)

    // --- Debugging Start ---
    console.log('Populated task being sent back:', JSON.stringify(populatedTask, null, 2));
    // --- Debugging End ---

    res.status(201).json(populatedTask); // Send back the populated task
  } catch (err) {
    console.error('Error in POST /tasks:', err); // Enhanced error logging
    res.status(500).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', auth, async (req, res) => {
  try {
    // Find ALL tasks, removing the filter for createdBy
    // const tasks = await Task.find({ createdBy: req.user._id }) // Old line
    const tasks = await Task.find({}) // Find all tasks
      .populate('createdBy', 'username email'); // Still populate createdBy info

    // Removed .populate('assignedTo', ...) as it's a string

    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a single task by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('createdBy', 'username'); // Populate createdBy with username
      // Removed .populate('assignedTo', ...)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Optional: Authorization check remains the same if based on createdBy
    // if (req.user && req.user.id && task.createdBy._id.toString() !== req.user.id) { ... }

    res.json(task);
  } catch (err) {
    console.error(err.message);
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Task not found' });
     }
    res.status(500).send('Server Error');
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, assignedTo, createdBy } = req.body; // assignedTo is expected as a String (name)

    // Basic validation
    if (!title || !description || !dueDate || !priority || !status || !assignedTo || !createdBy) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Removed assignedTo ObjectId validation
    // if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) { ... }

    // Validate createdBy ID
    if (createdBy && !mongoose.Types.ObjectId.isValid(createdBy)) {
      return res.status(400).json({ message: 'Invalid creator user ID' });
    }

    // Removed check if assignedUser exists by ID
    // if (assignedTo) { ... }

     // Check if creator user exists if ID is provided
     if (createdBy) {
        const creatorUser = await User.findById(createdBy);
        if (!creatorUser) return res.status(400).json({ message: 'Creator user does not exist' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      // assignedTo is updated directly as a string
      { title, description, dueDate, priority, status, assignedTo, createdBy },
      { new: true, runValidators: true }
    )
    .populate('createdBy', 'username'); // Populate only createdBy
    // Removed .populate('assignedTo', ...)

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    // Optional: Authorization check remains the same if based on createdBy
    // if (req.user && req.user.id && updatedTask.createdBy._id.toString() !== req.user.id) { ... }

    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    // Handle potential validation errors from findByIdAndUpdate
    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error during task update' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  // No changes needed here as it primarily uses task._id and potentially createdBy for auth
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Optional: Authorization check remains the same if based on createdBy
    // if (req.user && req.user.id && task.createdBy.toString() !== req.user.id) { ... }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
     if (err.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Task not found' });
     }
    res.status(500).json({ message: 'Server error during task deletion' });
  }
});

// Dashboard Route
router.get('/dashboard/:userId', auth, async (req, res) => {
  const { userId } = req.params;

  // Ensure the requesting user matches the dashboard userId or is an admin
  if (req.user.id !== userId /* && !req.user.isAdmin */) {
      return res.status(403).json({ message: 'Forbidden: Cannot access another user\'s dashboard' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    // Find the user to get their username for querying assigned tasks
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const username = user.username; // Get the username to query by

    // Find tasks assigned to the user *by name*
    const assignedTasks = await Task.find({ assignedTo: username })
                                    .populate('createdBy', 'username'); // Populate only createdBy
                                    // Removed .populate('assignedTo', ...)

    // Find tasks created by the user
    const createdTasks = await Task.find({ createdBy: userId })
                                   .populate('createdBy', 'username'); // Populate only createdBy
                                   // Removed .populate('assignedTo', ...)

    // Find overdue tasks assigned to the user *by name*
    const overdueTasks = await Task.find({
      assignedTo: username, // Query by username string
      dueDate: { $lt: new Date() },
      status: { $ne: 'done' },
    })
    .populate('createdBy', 'username'); // Populate only createdBy
    // Removed .populate('assignedTo', ...)


    res.json({ assignedTasks, createdTasks, overdueTasks });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
});

module.exports = router;
