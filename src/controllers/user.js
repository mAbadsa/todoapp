const { httpErrors } = require('../utils/httpErrors');
const { getUserInfo } = require('../database/queries/index');

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

const userId = '5c253f3d-d715-4836-82bf-c073374189dd';

exports.getUserById = async (req, res, next) => {
  // const { userId } = req.params;
  try {
    const { rows } = await getUserInfo(userId);
    res.status(200).json({
      success: true,
      status: 200,
      message: 'Get user successfully',
      user: {
        ...rows[0],
        password: '',
      },
    });
  } catch (error) {
    next(httpErrors(error));
  }
};

exports.createNewUser = (req, res) => {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    age,
    avatarImage,
  } = req.body;

  usersData.push({
    id,
    username,
    email,
    firstName,
    lastName,
    age,
    avatarImage,
  });

  res.status(201).json({
    success: true,
    status: 200,
    message: 'User create successfully.',
    usersLength: usersData.length,
  });
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

exports.updateUserById = (req, res) => {
  const {
    username, firstName, lastName, age, avatarImage,
  } = req.body;

  const user = usersData.find((_user) => _user.id === userId);
  const userIndex = usersData.findIndex((_user) => _user.id === userId);

  const updatedUser = {
    ...user,
    username: username || user.username,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    age: age || user.age,
    avatarImage: avatarImage || user.avatarImage,
  };

  usersData.splice(userIndex, 1, updatedUser);

  res.status(200).json({
    success: true,
    status: 200,
    messgae: 'User has been successfully updated',
    user: {
      ...updatedUser,
      password: '',
    },
  });
};

exports.deleteUserById = (req, res) => {
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
