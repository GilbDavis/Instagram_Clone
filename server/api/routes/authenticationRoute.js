const express = require("express");
const route = express.Router();

const authenticationController = require('../controllers/userAuthenticationController');
const validation = require('../../validation/validation');

// Obtiene el usuario autenticado /api/usuarios --GET
route.get("/");

// Create an user. route: api/usuarios/register --POST
route.post("/signup", validation.user.register, authenticationController.userRegisterController);

// Iniciar sesion api/usuarios/login -POST
route.post("/login", authenticationController.userLoginController);

module.exports = route;