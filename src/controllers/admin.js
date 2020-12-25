const {
  getAllUser,
  updateUserState,
} = require('../database/queries/index');
const { httpErrors } = require('../utils/httpErrors');

exports.getAllUsers = async (req, res, next) => {
  let { limit, skip } = req.query;
  if (!limit) {
    limit = 20;
  }
  if (!skip) {
    skip = 0;
  }
  try {
    const { rows } = await getAllUser(limit, skip);
    const users = rows.filter((user) => user.role !== 'admin');
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Get all users successfully.',
      users,
    });
  } catch (error) {
    return next(error);
  }
};

exports.changeUserState = async (req, res, next) => {
  const { userId } = req.params;
  const { userState } = req.body;
  try {
    const { rows } = await getAllUser();

    const user = rows.find((_user) => _user.user_id === userId);

    if (!user) {
      throw httpErrors('User not found!', 404);
    }

    const userUpdated = await updateUserState({
      userId: user.user_id,
      userState,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Change user state successfully.',
      userUpdated: userUpdated.rows[0],
    });
  } catch (error) {
    return next(error);
  }
};
