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
      check("password", "Password length must be 8 characters minimun.").trim().isLength(8)
    ]
  }
};

module.exports = validation;