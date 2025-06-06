// api/index.js

const express = require('express');
const dotenv = require('dotenv');
const BackendRoutes = require('../routes/routes'); // Note: adjust the path

dotenv.config();

const app = express();
app.use(express.json());

// API Routes
app.use('/api', BackendRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ message: 'Connected to backend' });
});

// Export for Vercel
module.exports = app;
