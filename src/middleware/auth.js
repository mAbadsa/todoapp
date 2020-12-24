/* eslint-disable consistent-return */
const JWT = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

const { httpErrors } = require('../utils/httpErrors');
const { getUserInfo } = require('../database/queries/index');

exports.auth = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      throw httpErrors('Not authorized to access this route.', 401);
    }
    const decoded = await JWT.verify(token, process.env.JWT_SECRET);

    const user = await getUserInfo(decoded.user_id);
    if (user.rows.length === 0) {
      throw httpErrors('Invalid credentials.', 401);
    }

    if (user.rows[0].user_state === 'suspended' && user.rows[0].role !== 'admin') {
      return next(httpErrors(`User is ${user.rows[0].user_state} is not authorized to access this route, Contact support`, 403));
    }

    [req.user] = user.rows;
    next();
  } catch (error) {
    return next(error);
  }
};

exports.authorize = (role) => (req, res, next) => {
  if (req.user.role !== role || !role) {
    return next(httpErrors(`User role ${req.user.role} is not authorized to access this roles`, 403));
  }
  next();
};
