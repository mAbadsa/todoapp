const router = require('express').Router();
const {
  signinValidator, signupUserValidator, updateUserValidator, runValidator,
} = require('../middleware/validator');
const {
  userLogin, getUserById, createNewUser, updateUserById, deleteUserById, getAllUsers,
} = require('../controllers/index');
const { auth, authorize } = require('../middleware/auth');

router.route('/users')
  .post(signupUserValidator, runValidator, createNewUser)
  .get(auth, getUserById).patch(auth, updateUserValidator, runValidator, updateUserById)
  .delete(auth, deleteUserById);

router.route('/users/all').get(auth, authorize('admin'), getAllUsers);

router.route('/users/login').post(signinValidator, runValidator, userLogin);

module.exports = { router };
