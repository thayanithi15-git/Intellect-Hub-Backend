const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ status: 'success', message: 'Auth routes working' });
});

// Add your actual auth routes here
router.post('/login', (req, res) => {
  res.json({ status: 'success', message: 'Login endpoint' });
});

router.post('/register', (req, res) => {
  res.json({ status: 'success', message: 'Register endpoint' });
});

module.exports = router;