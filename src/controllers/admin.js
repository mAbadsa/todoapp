const {
  getAllUser,
  updateUserState,
} = require('../database/queries/index');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { rows } = await getAllUser();
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Get all users successfully.',
      users: rows,
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
