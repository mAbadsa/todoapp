const bcrypt = require('bcrypt');
const { httpErrors } = require('../utils/httpErrors');
const {
  getUserInfo,
  updateUser,
  getUser,
  addUser,
} = require('../database/queries/index');

const usersData = [
  {
    id: 1,
    username: 'muhammad',
    email: 'test_1@test.com',
    firstName: 'Muhammad',
    lastName: 'Subhi',
    age: '22',
    avatarImage: 'https://via.placeholder.com/150',
    password: '12345678',
  },
  {
    id: 2,
    username: 'ali20',
    email: 'test_2@test.com',
    firstName: 'Ali',
    lastName: 'ALAli',
    age: '18',
    avatarImage: 'https://via.placeholder.com/150',
    password: '12345678',
  },
];

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
  const {
    username,
    email,
    password,

  } = req.body;

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

    console.log(_rows);

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

exports.userLogin = (req, res, next) => {
  const { email, password } = req.body;
  const user = usersData.find((_user) => _user.email === email);

  if (!user) {
    next(httpErrors('User is not exists.', 404));
  }

  if (user.password !== password) {
    next(httpErrors('Passwords do not match.', 400));
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: 'User login successfully.',
  });
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
    console.log('IN ERROR::');
    return next(error);
  }

  // const user = usersData.find((_user) => _user.id === userId);
  // const userIndex = usersData.findIndex((_user) => _user.id === userId);

  // const updatedUser = {
  //   ...user,
  //   username: username || user.username,
  //   firstName: firstName || user.firstName,
  //   lastName: lastName || user.lastName,
  //   age: age || user.age,
  //   avatarImage: avatarImage || user.avatarImage,
  // };

  // usersData.splice(userIndex, 1, updatedUser);
};

exports.deleteUserById = (req, res) => {
  const { userId } = req.params;

  const userIndex = usersData.findIndex((_user) => _user.id === userId);

  usersData.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    status: 200,
    message: 'User has been successfully deleted.',
    usersLength: usersData.length,
    usersData,
  });
};
