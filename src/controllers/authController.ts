import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken, setTokenCookie } from '../utils/jwt';
import { AuthRequest } from '../types';
import { comparePassword, hashPassword } from '../utils/hash';

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find login credentials - using lowercase 'login'
        const user = await prisma.login.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        // Validate password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
            return;
        }

        const token = generateToken({
            userId: user.userId,
            email: user.email,
            role: user.role,
        });

        setTokenCookie(res, token);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.userId,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
        });
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Using lowercase 'login'
        const user = await prisma.login.findUnique({
            where: { userId: req.user!.userId },
            select: {
                userId: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
            return;
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};