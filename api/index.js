const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middlewares
app.options('*', cors());

app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: (origin, callback) => {
    // Define allowed origins
    const allowedOrigins = [
      'http://localhost:3000',  // React dev server
      'http://localhost:3001',  // Alternative React port
      'https://intellect-hub-web.vercel.app/login',
      'https://intellect-hub-web.vercel.app', // Production frontend
      // Add your actual frontend URL here
    ];
    
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Health route (test this first)
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Server running',
    timestamp: new Date().toISOString()
  });
});

// Lazy load routes to avoid database connection timeouts
app.use('/api/auth', (req, res, next) => {
  try {
    const authRoutes = require('../routes/auth');
    authRoutes(req, res, next);
  } catch (error) {
    console.error('Auth routes error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Auth service temporarily unavailable',
      error: error.message
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
      message: 'User service temporarily unavailable',
      error: error.message
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
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Export handler function for Vercel
module.exports = (req, res) => {
  app(req, res);
};