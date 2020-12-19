const router = require('express').Router();
const {
  getAllTodosByUserId, getTodosByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('../controllers/index');

router.route('/todos').get(getAllTodosByUserId).post(createTodo);

router.route('/todos/:todoId').get(getTodosByTodoId).patch(updateTodoById).delete(deleteTodoById);

module.exports = { router };
