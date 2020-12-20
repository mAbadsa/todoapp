const connection = require('../config/connection');

exports.addUser = ({
  username, email, password, firstName, lastName, age,
}) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password, firstName, lastName, age, created_on) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP);',
    values: [username, email, password, firstName, lastName, age],
  };
  return connection.query(sql);
};

exports.addTodo = ({
  userId, todoContent, ImportanceLevel, taskType,
}) => {
  const sql = {
    text: 'INSERT INTO todos (user_id, todo_content, ImportanceLevel, taskType, created_on) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *;',
    values: [userId, todoContent, ImportanceLevel, taskType],
  };
  return connection.query(sql);
};
