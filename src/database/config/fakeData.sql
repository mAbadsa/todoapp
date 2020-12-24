INSERT INTO
    users (user_id, username, email, password, first_name, last_name, age, role, user_state, created_on, last_update)
VALUES
    ('5c253f3d-d715-4836-82bf-c073374189dd', 'muh123', 'muhammad@test.com', '$2b$10$KWUm3kxdBUjL0sMPtBiXGuZucrWfOQWq9S2XkfWmEaqIVcH8EAO/2', 'Muhammad', 'Alabadsa', null, 'admin', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('b3ea641e-1281-435c-8af7-059386395338', 'ahmed', 'ahmed@test.com', '$2b$10$KWUm3kxdBUjL0sMPtBiXGuZucrWfOQWq9S2XkfWmEaqIVcH8EAO/2', null, null, null, 'user', 'suspended', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('6c789cec-5d7c-4c62-89b8-88ffd013c7c5', 'ali22', 'ali@test.com', '$2b$10$KWUm3kxdBUjL0sMPtBiXGuZucrWfOQWq9S2XkfWmEaqIVcH8EAO/2', 'Ali', 'Alali', 25, 'user', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('f25d2a97-4766-40d9-bf4d-44847ad1bff9', 'hasan', 'hasan@test.com', '$2b$10$KWUm3kxdBUjL0sMPtBiXGuZucrWfOQWq9S2XkfWmEaqIVcH8EAO/2', 'Hasan', 'Alhasan', 36, 'user', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('b750f793-62d5-4841-bff4-b02b56bfb8cd', 'mahmoud14', 'mahmoud@test.com', '$2b$10$KWUm3kxdBUjL0sMPtBiXGuZucrWfOQWq9S2XkfWmEaqIVcH8EAO/2', 'Mahmoud', 'Almahmoud', 42, 'user', 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO
    todos (todo_id, user_id, todo_content, importance_level, task_type, created_on, last_update)
VALUES
    ('9c271a2d-beab-41d1-a5ea-b3ea06912742', (SELECT user_id FROM users WHERE username = 'muh123'), 'make coffee', 1, 'House', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('1b883a8e-206f-4bf1-a377-0af9bbc47f43', (SELECT user_id FROM users WHERE username = 'ahmed'), 'Clean House', 3, 'House', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('5301ea70-1d57-4b70-8c46-4b9657551978', (SELECT user_id FROM users WHERE username = 'muh123'), 'Make anything', 1, 'unclassified', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);