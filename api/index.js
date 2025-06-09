const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://intellect-hub-web.vercel.app',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Health route
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Server running',
    timestamp: new Date().toISOString()
  });
});

// Lazy load routes to avoid database connection issues during cold starts
app.use('/api/auth', (req, res, next) => {
  try {
    const authRoutes = require('../routes/auth');
    authRoutes(req, res, next);
  } catch (error) {
    console.error('Auth routes error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Auth service temporarily unavailable' 
    });
  }
});

app.use('/api/users', (req, res, next) => {
  try {
    const userRoutes = require('../routes/user');
    userRoutes(req, res, next);
  } catch (error) {
    console.error('User routes error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'User service temporarily unavailable' 
    });
  }
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
  res.status(404).json({ 
    status: 'error', 
    message: 'Route not found' 
  });
});

// Export the serverless wrapper
module.exports = serverless(app);