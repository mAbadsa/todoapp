const {
  getTodo, getTodos, getAllUser, getUserInfo, getUser,
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
  getUser,
  addTodo,
  addUser,
  updateTodo,
  updateUser,
  deleteTodo,
  deleteUser,
};
