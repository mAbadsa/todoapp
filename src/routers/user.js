const router = require('express').Router();

const {
  getUserById, createNewUser, updateUserById, deleteUserById,
} = require('../controllers/index');

router.route('/users/:userId').get(getUserById).patch(updateUserById).delete(deleteUserById);

router.route('/users').post(createNewUser);

module.exports = { router };
