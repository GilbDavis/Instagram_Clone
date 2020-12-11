const express = require("express");
const route = express.Router();

const authenticationController = require('../controllers/userAuthenticationController');
const validation = require('../../validation/validation');

// Obtiene el usuario autenticado /api/authentication --GET
route.get("/");

// Create an user. route: api/authentication/signup --POST
route.post("/signup", validation.user.register, authenticationController.userRegisterController);

// Iniciar sesion api/authentication/login -POST
route.post("/login", authenticationController.userLoginController);

// Sends a reset token to the user email. /api/authentication/resetpassword
route.post('/forgotpassword', validation.user.passwordReset, authenticationController.sendUserPasswordReset);

route.post('/reset/:token', validation.user.confirmPasswordReset, authenticationController.resetUserPassword);

module.exports = route;