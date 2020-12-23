const JWT = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

const { httpErrors } = require('../utils/httpErrors');
const { getUserInfo } = require('../database/queries/index');

exports.auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw httpErrors('Not authorized to access this route.', 401);
  }

  try {
    const decoded = await JWT.verify(token, process.env.JWT_SECRET);

    const user = await getUserInfo(decoded.user_id);

    [req.user] = user.rows;
    return next();
  } catch (error) {
    return next(error);
  }
};
