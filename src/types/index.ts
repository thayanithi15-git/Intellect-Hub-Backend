import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
    role: string;
  };
}

export interface CustomJwtPayload {
  userId: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

// Additional interfaces for better type safety
export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  designation?: string;
  place?: string;
  skills?: string;
  bio?: string;
  avatarUrl?: string;
}

export interface UserProfile {
  userId: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  designation?: string;
  place?: string;
  skills?: string;
  bio?: string;
  avatarUrl?: string;
  totalProblemsSolved: number;
  easyProblemsSolved: number;
  mediumProblemsSolved: number;
  hardProblemsSolved: number;
  currentStreak: number;
  longestStreak: number;
  ranking?: number;
  points: number;
  role?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
  loginCreatedAt?: Date;
  loginUpdatedAt?: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  token?: string;
}