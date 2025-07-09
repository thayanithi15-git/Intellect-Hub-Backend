// Fixed auth middleware (middleware/auth.ts)
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AuthRequest } from '../types';

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        let token;

        // Check for token in cookies first
        // if (req.cookies?.token) {
        //     token = req.cookies.token;
        // } 
        // Then check Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // If no token found, return 401 immediately
        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
            return; // This prevents further execution
        }

        // Verify the token
        const decoded = verifyToken(token);
        
        // If token is invalid, verifyToken should throw an error
        if (!decoded) {
            res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
            return;
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
        return;
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Access denied.',
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Insufficient permissions.',
            });
            return;
        }

        next();
    };
};