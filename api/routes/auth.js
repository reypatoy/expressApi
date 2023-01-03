const express = require('express');
const register  = require('../../handlers/auth/register');
const login = require('../../handlers/auth/login');
const verifyRefreshToken = require('../middleware/verifyRefreshToken');

const authRoutes = express.Router();

authRoutes.post('/register', register);

authRoutes.post('/login', login);

authRoutes.post('/refresh', verifyRefreshToken);

module.exports = authRoutes;