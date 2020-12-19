const usersData = [
  {
    id: 1,
    username: 'muhammad',
    email: 'test_1@test.com',
    firstName: 'Muhammad',
    lastName: 'Subhi',
    birthDay: '22-3-1989',
    avatarImage: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    username: 'ali20',
    email: 'test_2@test.com',
    firstName: 'Ali',
    lastName: 'ALAli',
    birthDay: '22-3-1990',
    avatarImage: 'https://via.placeholder.com/150',
  },
];

exports.getUserById = (req, res) => {
  const { userId } = req.params;
  const user = usersData.find((_user) => _user.id === +userId);

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Get user successfully',
    user: {
      ...user,
      password: '',
    },
  });
};

exports.createNewUser = (req, res) => {
  const {
    id,
    username,
    email,
    firstName,
    lastName,
    birthDay,
    avatarImage,
  } = req.body;

  usersData.push({
    id,
    username,
    email,
    firstName,
    lastName,
    birthDay,
    avatarImage,
  });

  res.status(201).json({
    success: true,
    status: 200,
    message: 'User create successfully.',
    usersLength: usersData.length,
  });
};

exports.updateUserById = (req, res) => {
  const {
    username, firstName, lastName, birthDay, avatarImage,
  } = req.body;
  const { userId } = req.params;

  const user = usersData.find((_user) => _user.id === +userId);
  const userIndex = usersData.findIndex((_user) => _user.id === +userId);

  const updatedUser = {
    ...user,
    username: username || user.username,
    firstName: firstName || user.firstName,
    lastName: lastName || user.lastName,
    birthDay: birthDay || user.birthDay,
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
  const { userId } = req.params;
  const userIndex = usersData.findIndex((_user) => _user.id === +userId);

  usersData.splice(userIndex, 1);

  res.status(200).json({
    success: true,
    status: 200,
    message: 'User has been successfully deleted.',
    usersLength: usersData.length,
    usersData,
  });
};
