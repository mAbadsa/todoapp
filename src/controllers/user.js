const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './config.env' });

const { httpErrors } = require('../utils/httpErrors');
const {
  getUserInfo,
  updateUser,
  getUser,
  addUser,
  deleteUser,
} = require('../database/queries/index');

// const userId = '5c253f3d-d715-4836-82bf-c073374189dd';

exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const { rows } = await getUserInfo(userId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Get user successfully',
      user: {
        ...rows[0],
        password: '',
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.createNewUser = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const { rows } = await getUser(email, username);
    if (rows.length > 0) {
      throw httpErrors('User already exists.', 409);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const { rowCount: _rowCount, rows: _rows } = await addUser({
      ...req.body,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      status: 200,
      message: 'User create successfully.',
      user: {
        ..._rows[0],
        password: '',
      },
      rowCount: _rowCount,
    });
  } catch (error) {
    return next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { rows } = await getUser(email);
    if (!rows.length > 0) {
      throw httpErrors('Invalid credentials.', 401);
    }

    const isMatch = bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      throw httpErrors('Invalid credentials.', 401);
    }

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
      ),
      httpOnly: true,
    };

    const token = await jwt.sign(
      { user_id: rows[0].user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    return res.status(200).cookie('token', token, options).json({
      success: true,
      status: 200,
      message: 'User login successfully.',
      token,
      user: {
        ...rows[0],
        password: '',
      },
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  const {
    firstName, lastName, age, avatarImage,
  } = req.body;

  try {
    const { rowCount, rows } = await getUserInfo(userId);
    if (rowCount === 0) {
      return next(httpErrors('User does not exist', 400));
    }
    const { rowCount: _rowCount, rows: _rows } = await updateUser({
      userId,
      firstName: firstName || rows[0].first_name,
      lastName: lastName || rows[0].last_name,
      age: age || rows[0].age,
      avatarImage: avatarImage || rows[0].avatar_iamge,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      messgae: 'User has been successfully updated',
      user: {
        ..._rows[0],
        password: '',
      },
      rowCount: _rowCount,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const { rowCount } = await deleteUser(userId);

    if (rowCount === 0) {
      throw httpErrors('User not found;', 404);
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User has been successfully deleted.',
      rowCount,
    });
  } catch (error) {
    return next(error);
  }
};
