const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('./todo');

const {
  getUserById, createNewUser, userLogin, updateUserById, deleteUserById,
} = require('./user');

const { getAllUsers, changeUserState } = require('./admin');

module.exports = {
  getAllTodosByUserId,
  getTodoByTodoId,
  createTodo,
  updateTodoById,
  deleteTodoById,
  getUserById,
  createNewUser,
  userLogin,
  updateUserById,
  deleteUserById,
  getAllUsers,
  changeUserState,
};
