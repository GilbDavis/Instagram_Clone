const { check } = require('express-validator');
const { User } = require('../models');

const validation = {
  user: {
    register: [
      check('fullName', "This field is required").trim().notEmpty().isString(),
      check('email').trim().isEmail().withMessage("A valid e-mail is required.")
        .custom((value, { req }) => {
          return User.findOne({ where: { email: value } })
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject("This E-mail already exists.");
              }
            })
        }).normalizeEmail({ gmail_remove_dots: false, gmail_lowercase: true }),
      check('userName').trim().custom((value, { req }) => {
        return User.findOne({ where: { userName: value } })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject("This username is already in use. Please try again with another username.");
            }
          })
      }),
      check("password", "Password length must be 8 characters minimun.").trim().isLength(8)
    ],
    passwordReset: [
      check('email', "Please enter a valid E-mail").trim().isEmail().normalizeEmail({ gmail_remove_dots: false, gmail_lowercase: true })
    ],
    confirmPasswordReset: [
      check("password", "Password length must be 8 characters minimun.").trim().isLength(8)
    ]
  }
};

module.exports = validation;