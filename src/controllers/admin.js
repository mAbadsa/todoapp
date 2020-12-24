const {
  getAllUser,
} = require('../database/queries/index');

exports.getAllUsers = async (req, res, next) => {
  try {
    const { rows } = await getAllUser();
    return res.status(200).json({
      success: true,
      message: 'Get all users successfully.',
      users: rows,
    });
  } catch (error) {
    return next(error);
  }
};
