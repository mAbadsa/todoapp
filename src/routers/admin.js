const router = require('express').Router();
const {
  getAllUsers,
  changeUserState,
} = require('../controllers/index');

const { auth, authorize } = require('../middleware/auth');

router.route('/admin/users').get(auth, authorize('admin'), getAllUsers);
router.route('/admin/users/userstate/:userId').post(auth, authorize('admin'), changeUserState);

module.exports = { router };
