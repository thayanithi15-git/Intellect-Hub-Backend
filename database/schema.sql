// Project Structure:
/*
backend/
├── config/
│   ├── db.js
│   └── jwt.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── validation.js
├── routes/
│   ├── auth.js
│   └── users.js
├── utils/
│   ├── hashPassword.js
│   └── generateToken.js
├── models/
│   └── userModel.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── database.sql
*/

// ===============================
// package.json
// ===============================
{
  "name": "backend-auth-postgresql",
  "version": "1.0.0",
  "description": "Backend with PostgreSQL, JWT Auth, and encrypted passwords",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express-validator": "^7.0.1",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["nodejs", "postgresql", "jwt", "authentication"],
  "author": "Your Name",
  "license": "MIT"
}

// ===============================
// .env
// ===============================
NODE_ENV=development
PORT=8080
DATABASE_URL=postgresql://thaya_db_owner:npg_Ci1hu3bmJRBt@ep-winter-mountain-a8u71xt1-pooler.eastus2.azure.neon.tech/thaya_db?sslmode=require

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Server Configuration
CORS_ORIGIN=http://localhost:3000

// ===============================
// .gitignore
// ===============================
node_modules/
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
*.log
dist/
build/

// ===============================
// database.sql - Run this to create the users table
// ===============================
-- Create users table with encrypted password support
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE
    ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
