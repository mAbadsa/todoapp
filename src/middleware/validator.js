const { check, validationResult } = require('express-validator');

exports.todoValidator = [
  check('todoContent')
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 150 })
    .withMessage('Task must be at least 5 characters long!'),
];

exports.signupUserValidator = [
  check('username').not().isEmpty().trim()
    .isLength({ min: 2 })
    .withMessage('Userame is required.'),
  check('email').isEmail().trim().withMessage('Must be a vaild email address.'),
  check('password', 'Password must be at least 8 character long.')
    .isLength({ min: 8 })
    .isAlphanumeric()
    .withMessage('Password must be at least 8 character long.'),
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
  check('username').not().isEmpty().trim()
    .isLength({ min: 2 })
    .withMessage('Userame must be at least 2 character long.'),
];

exports.runValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    const err = new Error();
    err.msg = errors.array()[0].msg;
    err.statusCode = 422;
    next(err);
  }
  next();
};