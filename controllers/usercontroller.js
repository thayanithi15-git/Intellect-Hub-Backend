const UserModel = require('../models/usermodel');
const { hashPassword } = require('../utils/hash');

const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await UserModel.findAll(limit, offset);

        res.status(200).json({
            status: 'success',
            results: users.length,
            users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error fetching users'
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.error('Get user by ID error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error fetching user'
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = { ...req.body };

        // Hash password if it's being updated
        if (updateData.password) {
            updateData.password = await hashPassword(updateData.password);
        }

        // Remove sensitive fields that shouldn't be updated directly
        delete updateData.id;
        delete updateData.created_at;

        const user = await UserModel.updateById(id, updateData);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error updating user'
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserModel.deleteById(id);

        if (!deletedUser) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error deleting user'
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};