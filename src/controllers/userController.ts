import { Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../types';

export const getAllUsers = async (req: AuthRequest, res: Response) => {
    try {
        const users = await prisma.login.findMany({
            select: {
                userId: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
            },
        });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};

export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { user_id } = req.params;

        const userId = parseInt(user_id, 10);

        if (isNaN(userId)) {
            res.status(400).json({
                success: false,
                message: 'Invalid user ID',
            });
            return;
        }

        const user = await prisma.login.findUnique({
            where: { userId },
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
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
};