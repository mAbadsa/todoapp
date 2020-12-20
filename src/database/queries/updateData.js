const connection = require('../config/connection');

exports.updateTodo = ({
  userId,
  todoId,
  todoContent,
  importanceLevel,
  taskType,
}) => {
  const sql = {
    text: 'UPDATE todos SET todo_content = $1, importance_level = $2, task_type = $3 WHERE user_id = $4 AND todo_id = $5 RETURNING *;',
    values: [todoContent, importanceLevel, taskType, userId, todoId],
  };
  return connection.query(sql);
};

exports.updateUser = ({
  userId,
  firstName,
  lastName,
  age,
}) => {
  const sql = {
    text: 'UPDATE users SET first_name = $1, last_name = $2, age = $3, last_update = CURRENT_TIMESTAMP WHERE user_id = $4 RETURNING *;',
    values: [firstName, lastName, age, userId],
  };
  return connection.query(sql);
};
