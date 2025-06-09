const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://intellect-hub-web.vercel.app',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server running' });
});

// Error handlers
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({ 
    status: 'error', 
    message: err.message || 'Internal Server Error' 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

// Export the serverless wrapper - CRITICAL for Vercel
module.exports = serverless(app);