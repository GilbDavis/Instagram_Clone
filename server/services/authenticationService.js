const bcrypt = require('bcryptjs');
const { DatabaseError, ValidationError } = require("../utils/errorHandler");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { response } = require('express');

class Authentication {
  constructor(userModel, logger, configuration, mailer) {
    this.userModel = userModel;
    this.logger = logger;
    this.config = configuration;
    this.mailer = mailer;
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

  async sendResetPassword(email) {
    try {
      const validateEmail = await this.userModel.findOne({ where: { email: email } });
      if (!validateEmail) {
        this.logger.warn(`${email} was not found in the database while trying to reset the password.`);
        throw new ValidationError(400, "The E-mail you entered does not exist.");
      }

      const token = await this.userModel.update({
        resetPasswordToken: crypto.randomBytes(16).toString('hex'),
        resetPasswordExpiration: new Date(Date.now() - (60 * 60 * 1000))
      }, {
        where: { id: validateEmail.id },
        returning: true,
        plain: true
      });
      if (!token) {
        throw new DatabaseError(400, "There was a problem while generating your reset token. Please try again", "fail");
      }

      const msg = {
        to: email,
        from: this.config.gmail.email,
        subject: "Reset Password",
        html: `<h1>Hello, </h1>
          <p>Please follow this link to change your current password. Click the next link to redirect you:
          <a href="https://${this.config.frontendBaseURL}/resetpassword/${token[1].resetPasswordToken}">Change password</a></p>`
      };
      await this.mailer.sendMail(msg);

      return { message: "Email was sent successfully", emailSent: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Authentication;