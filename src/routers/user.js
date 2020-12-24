const router = require('express').Router();
const {
  signinValidator, signupUserValidator, updateUserValidator, runValidator,
} = require('../middleware/validator');
const {
  userLogin, getUserById, createNewUser, updateUserById, deleteUserById,
} = require('../controllers/index');
const { auth } = require('../middleware/auth');

router.route('/users')
  .post(signupUserValidator, runValidator, createNewUser)
  .get(auth, getUserById).patch(auth, updateUserValidator, runValidator, updateUserById)
  .delete(auth, deleteUserById);

router.route('/users/login').post(signinValidator, runValidator, userLogin);

module.exports = { router };
