const express = require('express');
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/usercontroller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;