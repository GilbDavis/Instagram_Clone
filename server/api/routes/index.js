const express = require('express');
const route = express.Router();

route.use("/authentication", require('./authenticationRoute'));
route.use('/p', require('./postRoutes'));

module.exports = route;