const { User } = require('../../models');
const AuthenticationService = require('../../services/authenticationService');
const { validationResult } = require('express-validator');
const { CustomTypeError } = require('../../utils/errorHandler');
const logger = require('../../utils/logger');
const config = require('../../config/configuration');
const nodemailer = require('nodemailer');

const options = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: config.gmail.email,
    pass: config.gmail.password
  }
};
const transporter = nodemailer.createTransport(options);

exports.userRegisterController = async (request, response, next) => {

  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    logger.debug("A syntax error occurred in the registration controller");
    return next(new CustomTypeError(400, "Please check the syntax of the fields", 'fail', errors.array()));
  }
  const userDTO = request.body;

  try {
    const authenticationServiceInstance = new AuthenticationService(User, logger, config);

    const { token, user } = await authenticationServiceInstance.signUp(userDTO);

    return response.status(201).json({ status: "success", token, user });
  } catch (error) {
    return next(error);
  }
};

exports.userLoginController = async (request, response, next) => {
  const { email, password } = request.body;

  try {
    const authenticationServiceInstance = new AuthenticationService(User, logger, config);

    const { token, user } = await authenticationServiceInstance.login(email, password);

    return response.status(200).json({ status: 'success', token, user });
  } catch (error) {
    return next(error);
  }
};

exports.sendUserPasswordReset = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    logger.debug("A syntax error occurred in the registration controller");
    return next(new CustomTypeError(400, "Please check the syntax of the fields", 'fail', errors.array()));
  }

  try {
    const { email } = request.body;
    const authenticationServiceInstance = new AuthenticationService(User, logger, config, transporter);

    const { message, emailSent } = await authenticationServiceInstance.sendResetPassword(email);

    return response.status(200).json({ status: 'success', message: message });
  } catch (error) {
    return next(error);
  }
};

exports.resetUserPassword = async (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    logger.debug("A syntax error occurred in the registration controller");
    return next(new CustomTypeError(400, "Please check the syntax of the fields", 'fail', errors.array()));
  }

  try {
    const { password } = request.body;
    const { token } = request.params;
    const authenticationServiceInstance = new AuthenticationService(User, logger, config, transporter);

    const { message } = await authenticationServiceInstance.resetPassword(password, token);

    return response.status(201).json({ status: 'success', message: message });
  } catch (error) {
    return next(error);
  }
};

exports.authenticateUser = async (request, response, next) => {
  try {
    const authenticationServiceInstance = new AuthenticationService(User, logger, config);

    const user = await authenticationServiceInstance.isAuthenticated(request.user.id);

    return response.status(200).json({ status: 'success', user });
  } catch (error) {
    return next(error);
  }
};