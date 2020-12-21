const router = require('express').Router();
const { todoValidator, runValidator } = require('../middleware/validator');
const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('../controllers/index');

router.route('/todos').get(getAllTodosByUserId).post(todoValidator, runValidator, createTodo);

router.route('/todos/:todoId').get(getTodoByTodoId).patch(todoValidator, runValidator, updateTodoById).delete(deleteTodoById);

module.exports = { router };
