const {
  getTodo, getTodos, getAllUser, getUserInfo, getUser,
} = require('./getData');
const {
  addTodo, addUser,
} = require('./addData');
const { updateTodo, updateUser, updateUserState } = require('./updateData');
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
  updateUserState,
  deleteTodo,
  deleteUser,
};
