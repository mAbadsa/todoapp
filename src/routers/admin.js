const router = require('express').Router();
const {
  getAllUsers,
} = require('../controllers/index');

const { auth, authorize } = require('../middleware/auth');

router.route('/users/all').get(auth, authorize('admin'), getAllUsers);

module.exports = { router };
