const express = require('express');
const router = express.Router();

const { getLogin, login } = require('../controllers/authRoutes/auth');

router.get('/login/test', getLogin);

router.post('/login', login);

module.exports = router;
