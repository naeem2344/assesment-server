const express = require('express');
const { userRegistration, userLogin, logoutUser } = require('../controllers/usre.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const route = express.Router();

route.post('/create-user', userRegistration);
route.post('/login-user', userLogin);
route.get('/logout-user', authMiddleware, logoutUser);

route.get('/check', async (req, res) => {
    try {
        res.status(200).send({
            status: true,
            message: 'Server working successfully'
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: error
        })
    }
})

module.exports = route;
