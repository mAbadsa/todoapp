/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const { runBuild } = require('../../src/database/config/build.js');
const connection = require('../../src/database/config/connection');

let token;
beforeAll(() => runBuild());

describe('Todo routes test', () => {
  test('Test user login.', async (done) => {
    try {
      const res = await request(app).post('/api/v1/users/login').send({
        email: 'muhammad@test.com',
        password: '123456asd',
      });
      // eslint-disable-next-line no-unused-vars
      token = res.body.token; // save the token!
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Get all todos for specific user should be return 2', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.todos).toHaveLength(2);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Get all the todos for a specific user who is not logged in', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos')
        .expect(401)
        .expect('Content-Type', /json/)
        .set('Cookie', []);
      expect(res.body.message).toBe('Invalid credentials.');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Get specific todo should be return 1 todo', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos/5301ea70-1d57-4b70-8c46-4b9657551978')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.todo.todo_id).toBe(
        '5301ea70-1d57-4b70-8c46-4b9657551978',
      );
      expect(res.body.todo.todo_content).toBe('Make anything');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Create new todo should be return new task', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/todos')
        .expect(201)
        .expect('Content-Type', /json/)
        .send({
          todoContent: 'new task',
          importanceLevel: 1,
          taskType: 'house',
        })
        .set('Cookie', [`token=${token}`]);
      expect(res.body.todo.todo_content).toEqual('new task');
      expect(res.body.rowCount).toBe(1);
      const todos = await request(app)
        .get('/api/v1/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .send({
          todoContent: 'new task',
          importanceLevel: 1,
          taskType: 'house',
        })
        .set('Cookie', [`token=${token}`]);
      expect(todos.body.todos).toHaveLength(3);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Update todo Should be return new task--updated', async (done) => {
    try {
      const res = await request(app)
        .patch('/api/v1/todos/9c271a2d-beab-41d1-a5ea-b3ea06912742')
        .expect(200)
        .expect('Content-type', /json/)
        .send({
          todoContent: 'new task--updated',
          importanceLevel: 2,
          taskType: 'house',
        })
        .set('Cookie', [`token=${token}`]);
      expect(res.body.todo.todo_content).toBe('new task--updated');
      const todo = await request(app)
        .get('/api/v1/todos/9c271a2d-beab-41d1-a5ea-b3ea06912742')
        .expect(200)
        .expect('Content-type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(todo.body.todo.todo_content).toBe('new task--updated');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Delete specific todo for user who is not logged in', async (done) => {
    try {
      const res = await request(app)
        .delete('/api/v1/todos/5301ea70-1d57-4b70-8c46-4b9657551978')
        .expect(401)
        .expect('Content-Type', /json/)
        .set('Cookie', ['']);
      expect(res.body.message).toBe('Invalid credentials.');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Delete specific todo Should be return rowCount = 1', async (done) => {
    try {
      const res = await request(app)
        .delete('/api/v1/todos/5301ea70-1d57-4b70-8c46-4b9657551978')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.rowCount).toBe(1);
      const todos = await request(app)
        .get('/api/v1/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(todos.body.todos).toHaveLength(2);
      return done();
    } catch (error) {
      return done(error);
    }
  });
});

// User routes tests
describe('User routes test', () => {
  test('Create new user should be return username = khaled01', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/users')
        .expect(201)
        .expect('Content-Type', /json/)
        .send({
          username: 'khaled01',
          email: 'khaled@test.com',
          firstName: 'Khaled',
          lastName: 'Alkhaled',
          password: '12345678Asd',
          confirmPassword: '12345678Asd',
        });
      expect(res.body.user.username).toBe('khaled01');
      let nToken = '';
      const userLogin = await request(app).post('/api/v1/users/login').send({
        email: 'khaled@test.com',
        password: '12345678Asd',
      });
      // eslint-disable-next-line no-unused-vars
      nToken = userLogin.body.token; // save the token!
      const user = await request(app)
        .get('/api/v1/users')
        .expect(200)
        .set('Cookie', [`token=${nToken}`]);
      expect(user.body.user.username).toBe('khaled01');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Test user login.', async (done) => {
    try {
      const res = await request(app).post('/api/v1/users/login').send({
        email: 'khaled@test.com',
        password: '123456Asd',
      });
      // eslint-disable-next-line no-unused-vars
      token = res.body.token; // save the token!
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Get user data Should be return username = khaled01', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.user.username).toBe('khaled01');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Update user should be return 30', async (done) => {
    try {
      const res = await request(app)
        .patch('/api/v1/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .send({ age: '30' })
        .set('Cookie', [`token=${token}`]);
      expect(res.body.user.age).toBe(30);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Delete user should be return rowCount = 1', async (done) => {
    try {
      const res = await request(app)
        .delete('/api/v1/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.rowCount).toBe(1);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Test get user data after user deletion.', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'khaled@test.com',
          password: '123456Asd',
        })
        .expect(404);
      expect(res.body.message).toBe('User not found.');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Test admin login.', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'muhammad@test.com',
          password: '123456asd',
        })
        .expect(200);
      // eslint-disable-next-line no-unused-vars
      token = res.body.token; // save the token!
      expect(res.body.message).toBe('User login successfully.');
      expect(res.body.user.role).toBe('admin');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Test get all user by admin authorized.', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/admin/users')
        .expect(200)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.users).toHaveLength(4);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Change user state by admin account', async (done) => {
    try {
      const res = await request(app)
        .post(
          '/api/v1/admin/users/userstate/f25d2a97-4766-40d9-bf4d-44847ad1bff9',
        )
        .expect(200)
        .send({ userState: 'suspended' })
        .set('Cookie', [`token=${token}`]);
      expect(res.body.userUpdated.user_state).toBe('suspended');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Login user with state = suspended and try to get his data', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/users/login')
        .expect(200)
        .send({
          email: 'hasan@test.com',
          password: '12345678asd',
        });
      token = res.body.token;
      expect(res.body.message).toBe('User login successfully.');
      expect(res.body.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
      const userData = await request(app)
        .get('/api/v1/users')
        .expect(403)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(userData.body.message).toBe('User is suspended is not authorized to access this route, Contact support');
      return done();
    } catch (error) {
      return done(error);
    }
  });
});

afterAll(() => connection.end());
