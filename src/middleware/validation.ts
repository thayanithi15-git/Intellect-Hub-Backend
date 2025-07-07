import { Request, Response, NextFunction } from 'express';
import { validateEmail, validatePassword } from '../utils/validators';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
    return;
  }

  if (!validateEmail(email)) {
    res.status(400).json({
      success: false,
      message: 'Please provide a valid email',
    });
    return;
  }

  if (!validatePassword(password)) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long',
    });
    return;
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: 'Email and password are required',
    });
    return;
  }

  next();
};