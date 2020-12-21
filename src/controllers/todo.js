const {
  getTodos, getTodo, addTodo, updateTodo,
} = require('../database/queries/index');
const { httpErrors } = require('../utils/httpErrors');

const testingData = [
  {
    userId: 1,
    id: 1,
    todo_content: 'task-one',
    ImportanceLevel: 1,
    taskType: 'house',
    createdAt: '10-12-2020',
  },
  {
    userId: 1,
    id: 2,
    todo_content: 'task-two',
    ImportanceLevel: 3,
    taskType: 'office',
    createdAt: '10-12-2020',
  },
];

const userId = '5c253f3d-d715-4836-82bf-c073374189dd';

exports.getAllTodosByUserId = async (req, res, next) => {
  try {
    const { rows } = await getTodos(userId);
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
  try {
    const { rows } = await getTodo(userId, todoId);
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'get Todo successfully.',
      todo: rows,
    });
  } catch (error) {
    return next(error);
  }
};

exports.createTodo = async (req, res, next) => {
  const { todoContent, importanceLevel, taskType } = req.body;
  try {
    const { rowCount, rows } = await addTodo({
      userId, todoContent, importanceLevel, taskType,
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
      todos: _rows[0],
      rowCount: _rowCount,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteTodoById = (req, res) => {
  const { todoId } = req.params;
  const todos = testingData.filter((todo) => todo.id !== +todoId);

  res.status(200).json({
    success: true,
    status: 200,
    message: 'Todo Deleted.',
    todos,
  });
};
