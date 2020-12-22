const connection = require('../config/connection');

exports.getTodos = (userId) => {
  const sql = {
    text: 'SELECT * FROM todos WHERE user_id = $1',
    values: [userId],
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

exports.getUser = (email, username) => {
  const sql = {
    text: 'SELECT * FROM users WHERE email = $1 OR username = $2;',
    values: [email, username],
  };
  return connection.query(sql);
};

exports.getAllUser = () => connection.query('SELECT * FROM users');
