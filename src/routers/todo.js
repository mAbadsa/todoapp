const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { todoValidator, runValidator } = require('../middleware/validator');
const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('../controllers/index');

router.route('/todos').get(getAllTodosByUserId).post(todoValidator, runValidator, auth, createTodo);

router.route('/todos/:todoId').get(getTodoByTodoId).patch(todoValidator, runValidator, updateTodoById).delete(deleteTodoById);

module.exports = { router };
