import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken, setTokenCookie } from '../utils/jwt';
import { AuthRequest } from '../types';
import { comparePassword, hashPassword } from '../utils/hash';


// export const register = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { email, password, username } = req.body;

//         // Check if login already exists
//         const existingUser = await prisma.login.findUnique({ where: { email } });

//         if (existingUser) {
//             res.status(409).json({
//                 success: false,
//                 message: 'User already exists with this email',
//             });
//             return;
//         }

//         // Hash password
//         const hashedPassword = await hashPassword(password);

//         // Create user and login in a transaction to ensure consistency
//         const result = await prisma.$transaction(async (tx) => {
//             // Create user first
//             const newUser = await tx.login.create({
//                 data: {
//                     email,
//                     username,
//                 },
//             });

//             // Create login with userId from above
//             const loginEntry = await tx.login.create({
//                 data: {
//                     userId: newUser.userId, // This links to the user
//                     email,
//                     username,
//                     password: hashedPassword,
//                 },
//             });

//             return { user: newUser, login: loginEntry };
//         });

//         const token = generateToken({
//             userId: result.login.userId,
//             email: result.login.email,
//             role: result.login.role,
//         });

//         setTokenCookie(res, token);

//         res.status(201).json({
//             success: true,
//             message: 'User registered successfully',
//             user: {
//                 id: result.login.userId,
//                 email: result.login.email,
//                 username: result.login.username,
//                 role: result.login.role,
//             },
//             token,
//         });
//     } catch (error) {
//         console.error('Register error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Server error during registration',
//         });
//     }
// };

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find login credentials
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
        // Fixed: Use userId instead of user_id (consistent with schema field mapping)
        const user = await prisma.login.findUnique({
            where: { userId: req.user!.userId }, // Fixed field name
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