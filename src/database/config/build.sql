BEGIN;
DROP TABLE IF EXISTS users, todos CASCADE;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username   VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    age SMALLINT,
    password TEXT NOT NULL,
    avatar_image TEXT DEFAULT 'https://via.placeholder.com/150',
    role VARCHAR(30) DEFAULT 'user',
    user_state VARCHAR(30) DEFAULT 'active',
    created_on TIMESTAMP NOT NULL,
    last_update TIMESTAMP NOT NULL
);

CREATE TABLE todos (
    todo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    todo_content TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    importance_level SMALLINT,
    task_type VARCHAR(20),
    created_on TIMESTAMP NOT NULL,
    last_update TIMESTAMP NOT NULL
);

COMMIT;
