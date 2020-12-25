const { check, validationResult } = require('express-validator');

const { httpErrors } = require('../utils/httpErrors');

exports.todoValidator = [
  check('todoContent')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 150 })
    .withMessage('Task must be at least 5 characters long!'),
];

exports.signupUserValidator = [
  check('username')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 2 })
    .withMessage('Userame is required.'),
  check('email').isEmail().trim().withMessage('Must be a vaild email address.'),
  check('password', 'Password must include one lowercase character, one uppercase character, a number, and a special character.')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, 'i'),
  check(
    'confirmPassword',
    'PasswordConfirmation field must have the same value as the password field',
  )
    .exists()
    .custom((confirmPassword, { req }) => {
      const { password } = req.body;
      if (confirmPassword !== password) {
        throw new Error(
          'passwordConfirmation field must have the same value as the password field',
        );
      }
      return confirmPassword;
    }),
];

exports.signinValidator = [
  check('email').isEmail().trim(),
  check('password').not().isEmpty(),
];

exports.updateUserValidator = [
  check('age').trim().isInt().withMessage('Age must be at integer number.'),
];

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const { msg } = errors.array()[0];
    next(httpErrors(msg, 422));
  }
  next();
};
