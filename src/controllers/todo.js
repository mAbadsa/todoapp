const { getTodos, getTodo } = require('../database/queries/index');

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

exports.getTodosByTodoId = async (req, res, next) => {
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

exports.createTodo = (req, res) => {
  const { todoContent, ImportanceLevel, taskType } = req.body;

  const todo = {
    userId: 1,
    todoContent,
    ImportanceLevel,
    taskType,
  };

  res.status(201).json({
    success: true,
    status: 200,
    message: 'get Todo successfully.',
    todo,
  });
};

exports.updateTodoById = (req, res) => {
  const { todoContent, ImportanceLevel, taskType } = req.body;
  const { todoId } = req.params;
  const indexOfTodoForUpdate = testingData.findIndex((todo) => todo.id === +todoId);

  const updatedTodo = {
    ...testingData[indexOfTodoForUpdate],
    todoContent,
    ImportanceLevel,
    taskType,
  };

  testingData.splice(indexOfTodoForUpdate, 1, updatedTodo);

  res.status(200).json({
    success: true,
    status: 200,
    message: 'get Todo successfully.',
    todos: testingData,
  });
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
