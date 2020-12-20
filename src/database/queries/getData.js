const connection = require('../config/connection');

exports.getAllTodosByUserId = (userId) => {
  const sql = {
    text: 'SELECT * FROM todos WHERE user_id = $1',
    values: [userId],
  };
  return connection.query(sql);
};

exports.getSingleTodoByTodoId = (userId, todoId) => {
  const sql = {
    text: 'SELECT * FROM todos WHERE user_id = $1 AND todo_id = $2',
    values: [userId, todoId],
  };
  return connection.query(sql);
};

exports.getUserInfo = (userId) => {
  const sql = {
    text: 'SELECT * FROM users WHERE user_id = $1',
    values: [userId],
  };
  return connection.query(sql);
};
