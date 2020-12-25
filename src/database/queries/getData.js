const connection = require('../config/connection');

exports.getTodos = (userId, limit = 10, skip = 0) => {
  const sql = {
    text: 'SELECT * FROM todos WHERE user_id = $1 LIMIT $2 OFFSET $3;',
    values: [userId, limit, skip],
  };
  return connection.query(sql);
};

exports.getTodo = (userId, todoId) => {
  const sql = {
    text: 'SELECT * FROM todos WHERE user_id = $1 AND todo_id = $2',
    values: [userId, todoId],
  };
  return connection.query(sql);
};

exports.getUserInfo = (userId) => {
  const sql = {
    text: 'SELECT * FROM users WHERE user_id = $1;',
    values: [userId],
  };
  return connection.query(sql);
};

exports.getUser = (email) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email = $1;',
    values: [email],
  };
  return connection.query(sql);
};

exports.getAllUser = (limit = 20, skip = 0) => {
  const sql = {
    text: 'SELECT * FROM users LIMIT $1 OFFSET $2;',
    values: [limit, skip],
  };
  return connection.query(sql);
};
