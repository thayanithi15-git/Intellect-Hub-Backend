import express from 'express';
import { register, login, logout, getProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validateRegister, validateLogin } from '../middleware/validation';

const router = express.Router();

// Make sure all routes are properly defined
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);


router.post('/logout', logout);
router.get('/profile', protect, getProfile);

export default router;