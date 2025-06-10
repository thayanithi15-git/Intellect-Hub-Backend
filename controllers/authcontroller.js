const UserModel = require('../models/usermodel');
const { hashPassword, comparePassword } = require('../utils/hash');
const sendTokenResponse = require('../utils/token');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                status: 'error',
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        sendTokenResponse(user, 201, res);
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during registration'
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with password
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        // Check if user is active
        // if (!user.is_active) {
        //     return res.status(401).json({
        //         status: 'error',
        //         message: 'Account is deactivated'
        //     });
        // }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error during login'
        });
    }
};

const logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        status: 'success',
        message: 'User logged out successfully'
    });
};

const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);
        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Server error fetching user data'
        });
    }
};

module.exports = {
    register,
    login,
    logout,
    getMe
};