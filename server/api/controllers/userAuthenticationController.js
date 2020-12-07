const { User } = require('../../models');
const AuthenticationService = require('../../services/authenticationService');
const { validationResult } = require('express-validator');
const { CustomTypeError } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const config = require('../../config/configuration');

exports.userRegisterController = async (request, response, next) => {

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    logger.debug("A syntax error occurred in the registration controller");
    return next(new CustomTypeError(400, "Please check the syntax of the fields", 'fail', errors.array()));
  }
  const userDTO = request.body;

  try {
    const authenticationServiceInstance = new AuthenticationService(User, logger, config);

    const { token } = await authenticationServiceInstance.signUp(userDTO);

    return response.status(201).json({ status: "success", token });
  } catch (error) {
    return next(error);
  }
};

exports.userLoginController = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const authenticationServiceInstance = new AuthenticationService(User, logger, config);

    const { token } = await authenticationServiceInstance.login(email, password);

    return response.status(200).json({ status: 'success', token });
  } catch (error) {
    return next(error);
  }
};