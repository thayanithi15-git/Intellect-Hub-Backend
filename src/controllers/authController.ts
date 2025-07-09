import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken } from '../utils/jwt';
import { AuthRequest, LoginData, RegisterData } from '../types';
import { comparePassword, hashPassword } from '../utils/hash';


export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password }: RegisterData = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Username, email, and password are required',
      });
      return
    }

    const existingLogin = await prisma.login.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingLogin) {
      res.status(409).json({
        success: false,
        message: 'User with this email or username already exists',
      });
      return
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'User already exists in users table',
      });
      return
    }

    const hashedPassword = await hashPassword(password);

    // 4. Transaction to create User and Login
    const result = await prisma.$transaction(async (tx) => {
      // Create user (auto-increment userId)
      const newUser = await tx.user.create({
        data: {
          username,
          email,
        },
      });

      // Create login record
      const newLogin = await tx.login.create({
        data: {
          userId: newUser.userId,
          username,
          email,
          password: hashedPassword,
          role: 'user',
        },
      });

      return { user: newUser, login: newLogin };
    });

    // 5. Ensure login was created
    if (!result.login) {
      res.status(500).json({
        success: false,
        message: 'Failed to create login credentials',
      });
      return
    }

    // 6. Generate JWT token
    const token = generateToken({
      userId: result.user.userId,
      email: result.user.email,
      role: result.login.role,
    });

    // 7. Set token in cookie
    // setTokenCookie(res, token);

    const fullUser = await prisma.user.findUnique({
      where: { userId: result.user.userId },
    });

    // 8. Response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: fullUser?.userId,
        username: fullUser?.username,
        email: fullUser?.email,
        firstName: fullUser?.firstName,
        lastName: fullUser?.lastName,
        designation: fullUser?.designation,
        place: fullUser?.place,
        bio: fullUser?.bio,
        avatarUrl: fullUser?.avatarUrl,
        skills: fullUser?.skills,
        role: result.login.role,
        joined: fullUser?.createdAt,
      },
      token,
    });
    return

  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
    });
    return
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: LoginData = req.body;

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

    // setTokenCookie(res, token);

    const profile = await prisma.user.findUnique({
      where: { userId: user.userId },
    });

    if (!profile) {
      res.status(404).json({
        success: false,
        message: 'User profile not found',
      });
      return;
    }


    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: profile.userId,
        username: profile.username,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        designation: profile.designation,
        place: profile.place,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        skills: profile.skills,
        role: user.role,
        joined: user.createdAt,
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

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    // Fetch from User table with all details and include login info
    const user = await prisma.user.findUnique({
      where: { userId: req.user!.userId },
      include: {
        login: {
          select: {
            role: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
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
      user: {
        // User table fields
        userId: user.userId,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        designation: user.designation,
        place: user.place,
        skills: user.skills,
        bio: user.bio,
        avatarUrl: user.avatarUrl,
        totalProblemsSolved: user.totalProblemsSolved,
        easyProblemsSolved: user.easyProblemsSolved,
        mediumProblemsSolved: user.mediumProblemsSolved,
        hardProblemsSolved: user.hardProblemsSolved,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        ranking: user.ranking,
        points: user.points,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Login table fields
        role: user.login?.role,
        isActive: user.login?.isActive,
        loginCreatedAt: user.login?.createdAt,
        loginUpdatedAt: user.login?.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const {
      firstName,
      lastName,
      designation,
      place,
      skills,
      bio,
      avatarUrl,
    } = req.body;

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { userId },
      data: {
        ...(firstName !== undefined && { firstName }),
        ...(lastName !== undefined && { lastName }),
        ...(designation !== undefined && { designation }),
        ...(place !== undefined && { place }),
        ...(skills !== undefined && { skills }),
        ...(bio !== undefined && { bio }),
        ...(avatarUrl !== undefined && { avatarUrl }),
      },
      include: {
        login: {
          select: {
            role: true,
            isActive: true,
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        userId: updatedUser.userId,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        designation: updatedUser.designation,
        place: updatedUser.place,
        skills: updatedUser.skills,
        bio: updatedUser.bio,
        avatarUrl: updatedUser.avatarUrl,
        totalProblemsSolved: updatedUser.totalProblemsSolved,
        easyProblemsSolved: updatedUser.easyProblemsSolved,
        mediumProblemsSolved: updatedUser.mediumProblemsSolved,
        hardProblemsSolved: updatedUser.hardProblemsSolved,
        currentStreak: updatedUser.currentStreak,
        longestStreak: updatedUser.longestStreak,
        ranking: updatedUser.ranking,
        points: updatedUser.points,
        role: updatedUser.login?.role,
        isActive: updatedUser.login?.isActive,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update',
    });
  }
};