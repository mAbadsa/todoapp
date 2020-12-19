const {
  getAllTodosByUserId, getTodosByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('./todo');

const {
  getUserById, createNewUser, userLogin, updateUserById, deleteUserById,
} = require('./user');

module.exports = {
  getAllTodosByUserId,
  getTodosByTodoId,
  createTodo,
  updateTodoById,
  deleteTodoById,
  getUserById,
  createNewUser,
  userLogin,
  updateUserById,
  deleteUserById,
};
