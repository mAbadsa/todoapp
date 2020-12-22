const connection = require('../config/connection');

exports.deleteTodo = (userId, todoId) => {
  const sql = {
    text: 'DELETE FROM todos WHERE user_id = $1 AND todo_id = $2;',
    values: [userId, todoId],
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
