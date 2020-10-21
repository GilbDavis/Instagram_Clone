const express = require('express');
const route = express.Router();

route.use("/authentication", require('./authenticationRoute'));

module.exports = route;