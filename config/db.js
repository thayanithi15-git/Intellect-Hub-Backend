const { Pool } = require('pg');
require('dotenv').config();

// Create pool but DON'T connect immediately
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 1, // Important: Keep low for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Remove this immediate connection attempt - it causes timeouts in serverless
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error connecting to Neon:', err.stack);
//   }
//   console.log('Connected to Neon DB');
//   release();
// });

// Export query function instead of pool directly
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};