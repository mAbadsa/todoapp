const connection = require('../config/connection');

exports.addUser = ({
  username, email, password, firstName, lastName, age,
}) => {
  const sql = {
    text: 'INSERT INTO users (username, email, password, first_name, last_name, age, created_on, last_update) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;',
    values: [username, email, password, firstName, lastName, age],
  };
  return connection.query(sql);
};

exports.addTodo = ({
  userId, todoContent, importanceLevel, taskType,
}) => {
  const sql = {
    text: 'INSERT INTO todos (user_id, todo_content, importance_level, task_type, created_on, last_update) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *;',
    values: [userId, todoContent, importanceLevel, taskType],
  };
  return connection.query(sql);
};
