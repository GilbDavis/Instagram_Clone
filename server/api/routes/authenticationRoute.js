const express = require("express");
const route = express.Router();

// Obtiene el usuario autenticado /api/usuarios -GET
route.get("/");

// Crear un usuario api/usuarios/register -POST
route.post("/register");

// Iniciar sesion api/usuarios/login -POST
route.post("/login");

module.exports = route;