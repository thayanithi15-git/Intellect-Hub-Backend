import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';
import ms from 'ms'; // Optional: only if you want to validate/convert

type MsString = `${number}${'s' | 'm' | 'h' | 'd'}`; // e.g., '7d', '60s'

// Define the expected payload shape (customize this as needed)
interface CustomJwtPayload {
    userId?: number;
    email?: string;
    role?: string;
}

// Generate a token with optional expiry
export const generateToken = (payload: CustomJwtPayload): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRE as MsString || '7d';

    if (!secret) throw new Error('JWT_SECRET not defined in environment');

    const options: SignOptions = { expiresIn };

    return jwt.sign(payload, secret, options);
};

// Verify and return the decoded token
export const verifyToken = (token: string): CustomJwtPayload => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET not defined in environment');

    return jwt.verify(token, secret) as CustomJwtPayload;
};

// Set JWT token in a secure cookie
export const setTokenCookie = (res: Response, token: string): void => {
    const cookieExpireDays = parseInt(process.env.JWT_COOKIE_EXPIRE || '7');

    res.cookie('token', token, {
        expires: new Date(Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
};
