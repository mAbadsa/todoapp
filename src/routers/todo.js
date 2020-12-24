const router = require('express').Router();
const { auth } = require('../middleware/auth');
const { todoValidator, runValidator } = require('../middleware/validator');
const {
  getAllTodosByUserId, getTodoByTodoId, createTodo, updateTodoById, deleteTodoById,
} = require('../controllers/index');

// router.use(auth);

router.route('/todos').get(auth, getAllTodosByUserId).post(auth, todoValidator, runValidator, createTodo);

router.route('/todos/:todoId').get(auth, getTodoByTodoId).patch(auth, todoValidator, runValidator, updateTodoById).delete(auth, deleteTodoById);

module.exports = { router };
