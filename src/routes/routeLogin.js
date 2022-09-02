const express = require('express');
const crypto = require('crypto');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');
 
 const routeLogin = express.Router();
 
 routeLogin.post('/login', validateEmail, validatePassword, (request, response) => { 
  const token = crypto.randomBytes(8).join('').substring(0, 16);
   try {
     return response.status(200).json({ token });   
   } catch (error) {
    console.log('O loco bixo');
   } 
});

module.exports = routeLogin;
