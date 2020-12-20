const connection = require('../config/connection');

exports.deleteTodo = (todoId) => {
  const sql = {
    text: 'DELETE FROM todos WHERE todo_id = $1;',
    values: [todoId],
  };
  return connection.query(sql);
};

exports.deleteUser = (userId) => {
  const sql = {
    text: 'DELETE FROM users WHERE user_id = $1;',
    values: [userId],
  };
  return connection.query(sql);
};
