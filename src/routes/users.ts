import express from 'express';
import { getAllUsers, getUserById } from '../controllers/userController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, authorize('ADMIN'), getAllUsers);
router.get('/:id', protect, getUserById);
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test route working 🎉',
  });
});

export default router;