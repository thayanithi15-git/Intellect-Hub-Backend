const jwt = require('jsonwebtoken');

const jwtConfig = {
    secret: process.env.JWT_SECRET || 'fallback_secret_key',
    expiresIn: process.env.JWT_EXPIRE || '7d',
    cookieExpire: parseInt(process.env.JWT_COOKIE_EXPIRE) || 7
};

const generateToken = (payload) => {
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
    });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtConfig.secret);
};

const cookieOptions = {
    expires: new Date(Date.now() + jwtConfig.cookieExpire * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
};

module.exports = {
    generateToken,
    verifyToken,
    cookieOptions,
    jwtConfig
};