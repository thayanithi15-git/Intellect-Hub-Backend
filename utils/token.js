const { generateToken, cookieOptions } = require('../config/jwt');

const sendTokenResponse = (user, statusCode, res) => {
    const token = generateToken({
        id: user.id,
        email: user.email,
    });

    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at
    };

    res.status(statusCode)
       .cookie('token', token, cookieOptions)
       .json({
           status: 'success',
           token,
           user: userResponse
       });
};

module.exports = sendTokenResponse;