const bcrypt = require('bcryptjs');
const { DatabaseError, ValidationError } = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');

class Authentication {
  constructor(userModel, logger, configuration) {
    this.userModel = userModel;
    this.logger = logger;
    this.config = configuration;
  }

  async signUp(userDTO) { //userDTO: user data object
    try {
      const salt = await bcrypt.genSalt(10);
      userDTO.password = await bcrypt.hash(userDTO.password, salt);

      const user = await this.userModel.create(userDTO);
      if (!user) {
        this.logger.error(`An error occurred while creating ${userDTO.fullName} user`)
        throw new DatabaseError(500, "An error ocurred while singup", "error");
      }

      this.logger.info(`${userDTO.email} created successfully`);
      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, this.config.jwt_secret, {
        expiresIn: '1h'
      });
      this.logger.debug("Token has been generated!");

      return { token };
    } catch (error) {
      this.logger.debug(`A ${error.name}: ${error.message} | Occurred in Register Service`);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const user = await this.userModel.findOne({ $or: [{ email: email }, { userName: email }] });
      if (!user) {
        this.logger.error(`${email} was not found in the database`);
        throw new DatabaseError(404, "User not found", "fail");
      }

      const passwordVerification = await bcrypt.compare(password, user.password);
      if (!passwordVerification) {
        this.logger.error(`${email} failed to login`);
        throw new ValidationError(400, "You have entered an invalid Email/UserName or password", "fail");
      }

      const payload = {
        user: {
          id: user.id
        }
      };
      const token = jwt.sign(payload, this.config.jwt_secret);

      return { token };
    } catch (error) {
      throw error;
    }
  }

  async isAuthenticated(userId) {
    try {
      const user = await this.userModel.findByPk(userId, { attributes: { exclude: ['password'] } },);
      if (!user) {
        throw new ValidationError(401, "You are not authenticated. Please login to your account.", "error");
      }
      return user;
    } catch (error) {
      this.logger.error("Ocurrio un error en el servicio usuarioAutenticado");
      throw error;
    }
  }
}

module.exports = Authentication;