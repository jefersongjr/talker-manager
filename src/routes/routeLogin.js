const express = require('express');
const crypto = require('crypto');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const token = crypto.randomBytes(8).toString('hex');

const routeLogin = express.Router();

routeLogin.post('/login', validateEmail, validatePassword, async (request, response) => { 
   try {
     return response.status(200).json({ token });   
   } catch (error) {
    return error.message;
   } 
});

module.exports = routeLogin;
