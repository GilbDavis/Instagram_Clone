const jwt = require("jsonwebtoken");
const config = require("../../config/configuration");
const logger = require("../../utils/logger");
const { AuthenticationError } = require('../../utils/errorHandler');

module.exports = (req, res, next) => {
  // Extract the token from header
  const getToken = req.get("Authorization");
  logger.debug("Extrayendo token...");
  // Check if there is no token
  if (!getToken) {
    logger.error("Token not found.");
    throw next(new AuthenticationError(401, "No token found, invalid permission.", 'fail'));
  }
  logger.debug("Verificando validez del token...");

  const token = getToken.toString().split(" "); // Extract the token without the Bearer
  try { // Validate the token if it exist
    jwt.verify(token[1], config.jwt_secret, ((err, decode) => {
      if (err) {
        return next(new AuthenticationError(401, "The token is invalid. Please try again.", 'fail'));
      }

      req.user = decode.user;
      logger.debug("El token fue validado con exito");
      return next();
    }));
  } catch (error) {
    logger.warn("El token introducido no es valido");
    throw error;
  }
};