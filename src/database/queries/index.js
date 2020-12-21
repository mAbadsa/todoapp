const {
  getTodo, getTodos, getAllUser, getUserInfo,
} = require('./getData');
const {
  addTodo, addUser,
} = require('./addData');
const { updateTodo, updateUser } = require('./updateData');
const { deleteTodo, deleteUser } = require('./deleteData');

module.exports = {
  getTodo,
  getTodos,
  getAllUser,
  getUserInfo,
  addTodo,
  addUser,
  updateTodo,
  updateUser,
  deleteTodo,
  deleteUser,
};
