const { check } = require('express-validator');

const validation = {
  user: {
    register: [
      check('fullName', "This field is required").trim().notEmpty().isString(),
      check('email').trim().isEmail().withMessage("A valid e-mail is required.")
        .custom((value, { req }) => {
          return User.findOne({ where: { email: value } })
            .then(userDoc => {
              if (userDoc) {
                return Promise.reject("Este correo electronico ya fue utilizado.");
              }
            })
        }).normalizeEmail({ gmail_remove_dots: false, gmail_lowercase: true }),
      check("password", "Password should have at least 1 uppercase, 1 lowercase, a number and a character").trim().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    ]
  }
};

module.exports = validation;