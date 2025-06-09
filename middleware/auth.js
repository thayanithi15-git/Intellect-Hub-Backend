const { verifyToken } = require('../config/jwt');
const db = require('../config/db');

const protect = async (req, res, next) => {
    let token;

    // Check for token in cookies first, then headers
    if (req.cookies.token) {
        token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized to access this route'
        });
    }

    try {
        const decoded = verifyToken(token);
        
        // Check if user still exists
        const result = await db.query(
            'SELECT id, name, email, role, is_active FROM users WHERE id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                status: 'error',
                message: 'User no longer exists'
            });
        }

        const user = result.rows[0];

        if (!user.is_active) {
            return res.status(401).json({
                status: 'error',
                message: 'User account is deactivated'
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Not authorized to access this route'
        });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'User role is not authorized to access this route'
            });
        }
        next();
    };
};

module.exports = { protect, authorize };