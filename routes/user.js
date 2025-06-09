const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ status: 'success', message: 'User routes working' });
});

// Add your actual user routes here
router.get('/profile', (req, res) => {
  res.json({ status: 'success', message: 'Profile endpoint' });
});

module.exports = router;