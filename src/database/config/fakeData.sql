INSERT INTO
    users (username, email, password, firstName, lastName, age, created_on)
VALUES
    ('muh123', 'muhammad@test.com', '123456asd', 'Muhammad', 'Alabadsa', null, CURRENT_TIMESTAMP),
    ('ahmed', 'ahmed@test.com', '123456asd', null, null, null, CURRENT_TIMESTAMP);

INSERT INTO
    todos (user_id, todo_content, ImportanceLevel, taskType, created_on)
VALUES
    ((SELECT user_id FROM users WHERE username = 'muh123'), 'make coffee', 1, 'House', CURRENT_TIMESTAMP),
    ((SELECT user_id FROM users WHERE username = 'ahmed'), 'Clean House', 3, 'House', CURRENT_TIMESTAMP),
    ((SELECT user_id FROM users WHERE username = 'muh123'), 'Make anything', 1, 'unclassified', CURRENT_TIMESTAMP);