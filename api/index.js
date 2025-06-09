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

// Health route - Test this first
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Server running',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Test route to check if basic functionality works
app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Test route working',
    headers: req.headers,
    query: req.query
  });
});

// Try to load routes with error handling
try {
  console.log('Loading auth routes...');
  const authRoutes = require('../routes/auth');
  app.use('/api/auth', authRoutes);
  console.log('Auth routes loaded successfully');
} catch (error) {
  console.error('Failed to load auth routes:', error.message);
  // Create a fallback route
  app.use('/api/auth', (req, res) => {
    res.status(500).json({ 
      status: 'error', 
      message: 'Auth routes failed to load: ' + error.message 
    });
  });
}

try {
  console.log('Loading user routes...');
  const userRoutes = require('../routes/user');
  app.use('/api/users', userRoutes);
  console.log('User routes loaded successfully');
} catch (error) {
  console.error('Failed to load user routes:', error.message);
  // Create a fallback route
  app.use('/api/users', (req, res) => {
    res.status(500).json({ 
      status: 'error', 
      message: 'User routes failed to load: ' + error.message 
    });
  });
}

// Error handlers
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({ 
    status: 'error', 
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    status: 'error', 
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Export the serverless wrapper
module.exports = serverless(app);