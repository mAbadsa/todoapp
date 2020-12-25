const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require('../database/queries/index');
const { httpErrors } = require('../utils/httpErrors');

exports.getAllTodosByUserId = async (req, res, next) => {
  const userId = req.user.user_id;
  let { limit, skip } = req.query;
  if (!limit) {
    limit = 10;
  }
  if (!skip) {
    skip = 0;
  }

  try {
    const { rows } = await getTodos(userId, limit, skip);
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'get Todo successfully.',
      todos: rows,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getTodoByTodoId = async (req, res, next) => {
  const { todoId } = req.params;
  const userId = req.user.user_id;
  try {
    const { rows } = await getTodo(userId, todoId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'get Todo successfully.',
      todo: rows[0],
    });
  } catch (error) {
    return next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  const { todoContent, importanceLevel, taskType } = req.body;
  const userId = req.user.user_id;
  try {
    const { rowCount, rows } = await addTodo({
      userId,
      todoContent,
      importanceLevel,
      taskType,
    });
    return res.status(201).json({
      success: true,
      status: 200,
      message: 'get Todo successfully.',
      todo: rows[0],
      rowCount,
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateTodoById = async (req, res, next) => {
  const { todoContent, importanceLevel, taskType } = req.body;
  const { todoId } = req.params;
  const userId = req.user.user_id;
  try {
    const { rowCount, rows } = await getTodo(userId, todoId);
    if (rowCount === 0) {
      next(httpErrors('Todo Not Fount', 404));
    }

    const { rowCount: _rowCount, rows: _rows } = await updateTodo({
      userId,
      todoId,
      todoContent: todoContent || rows[0].todo_content,
      importanceLevel: importanceLevel || rows[0].importance_level,
      taskType: taskType || rows[0].task_type,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'get Todo successfully.',
      todo: _rows[0],
      rowCount: _rowCount,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteTodoById = async (req, res, next) => {
  const { todoId } = req.params;
  const userId = req.user.user_id;
  try {
    const { rowCount } = await deleteTodo(userId, todoId);

    if (rowCount === 0) {
      throw httpErrors('Todo not found.', 404);
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Todo Deleted.',
      rowCount,
    });
  } catch (error) {
    return next(error);
  }
};
