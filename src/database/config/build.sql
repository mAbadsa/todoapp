BEGIN;
DROP TABLE IF EXISTS users, todos CASCADE;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username   VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    age SMALLINT,
    password TEXT NOT NULL,
    created_on TIMESTAMP NOT NULL
);

CREATE TABLE todos (
    todo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    todo_content TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    ImportanceLevel SMALLINT,
    taskType VARCHAR(20),
    created_on TIMESTAMP NOT NULL
);

COMMIT;
