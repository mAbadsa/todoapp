/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const { runBuild } = require('../../src/database/config/build.js');
const connection = require('../../src/database/config/connection');

let token;
beforeAll(() => runBuild());
beforeAll(async (done) => {
  try {
    const res = await request(app)
      .post('/api/v1/users/login')
      .send({
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

describe('Todo routes test', () => {
  test('Get all todos for specific user should be return 2', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.todos.length).toBe(2);
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
      expect(res.body.todo.length).toBe(1);
      expect(res.body.todo[0].todo_id).toBe(
        '5301ea70-1d57-4b70-8c46-4b9657551978',
      );
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
      expect(res.body.todos.todo_content).toBe('new task--updated');
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
          password: '12345678asd',
          confirmPassword: '12345678asd',
        });
      expect(res.body.user.username).toBe('khaled01');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Get user data Should be return username = muh123', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/users')
        .expect(200)
        .expect('Content-Type', /json/)
        .set('Cookie', [`token=${token}`]);
      expect(res.body.user.username).toBe('muh123');
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
});

afterAll(() => connection.end());
