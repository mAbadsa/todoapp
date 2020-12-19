const router = require('express').Router();
const {
  signinValidator, signupUserValidator, updateUserValidator, runValidator,
} = require('../middleware/validator');
const {
  userLogin, getUserById, createNewUser, updateUserById, deleteUserById,
} = require('../controllers/index');

router.route('/users/:userId').get(getUserById).patch(updateUserValidator, runValidator, updateUserById).delete(deleteUserById);

router.route('/users').post(signupUserValidator, runValidator, createNewUser);

router.route('/users/login').post(signinValidator, runValidator, userLogin);

module.exports = { router };
