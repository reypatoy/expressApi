const verifyToken = require('../middleware/verifyToken');
const pagesRoutes = require('express').Router();
const getUsers = require('../../handlers/pages/getUsers');

pagesRoutes.get('/users', verifyToken, getUsers);

module.exports = pagesRoutes;
