const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('./todo');

const {
  getUserById, createNewUser, userLogin, updateUserById, deleteUserById, getAllUsers,
} = require('./user');

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
};
