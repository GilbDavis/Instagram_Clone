const { User } = require('../../models');
const AuthenticationService = require('../../services/authenticationService');
const { validationResult } = require('express-validator');
const { TypeError } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');

exports.userRegisterController = (request, response, next) => {

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    logger.debug("A syntax error occurred in the registration controller");
    return next(new TypeError(400, "Please check the syntax of the fields", 'fail', errors.array()));
  }
  const { fullName, email, userName, password } = req.body;

  try {

  } catch (error) {

  }
}