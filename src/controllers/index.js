const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('./todo');

const {
  getUserById, createNewUser, userLogin, updateUserById, deleteUserById,
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
};
