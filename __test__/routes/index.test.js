/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const { runBuild } = require('../../src/database/config/build.js');
const connection = require('../../src/database/config/connection');

beforeAll(() => runBuild());
describe('Todo routes test', () => {
  test('Get all todos for specific user should be return 2', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(res.body.todos.length).toBe(2);
      return done();
    } catch (error) {
      return done(err);
    }
  });

  test('Get specific todo should be return 1 todo', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/todos/5301ea70-1d57-4b70-8c46-4b9657551978')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(res.body.todo.length).toBe(1);
      expect(res.body.todo[0].todo_id).toBe(
        '5301ea70-1d57-4b70-8c46-4b9657551978',
      );
      return done();
    } catch (error) {
      return done(err);
    }
  });

  test('Create new todo should be return new task', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/todos')
        .expect(201)
        .expect('Content-Type', /json/)
        .send({
          userId: 1,
          todoContent: 'new task',
          importanceLevel: 1,
          taskType: 'house',
        });
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
        });
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
        .expect('Content-Type', /json/);
      expect(res.body.rowCount).toBe(1);
      return done();
    } catch (error) {
      return done(error);
    }
  });
});

describe('User routes test', () => {
  test('Get user data Should be return username = muh123', async (done) => {
    try {
      const res = await request(app)
        .get('/api/v1/users/5c253f3d-d715-4836-82bf-c073374189dd')
        .expect(200)
        .expect('Content-Type', /json/);
      expect(res.body.user.username).toBe('muh123');
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Should be return username = ibrahim05', async (done) => {
    try {
      const res = await request(app)
        .post('/api/v1/users')
        .expect(201)
        .expect('Content-Type', /json/)
        .send({
          username: 'ibrahim05',
          email: 'ibrahim@test.com',
          firstName: 'Ibrahim',
          lastName: 'AlIbrahim',
          password: '12345678asd',
          confirmPassword: '12345678asd',
        });
      expect(res.body.user.username).toBe('ibrahim05');
      return done();
    } catch (error) {
      return done(err);
    }
  });

  test('Should be return 30', async (done) => {
    try {
      const res = await request(app)
        .patch('/api/v1/users/5c253f3d-d715-4836-82bf-c073374189dd')
        .expect(200)
        .expect('Content-Type', /json/)
        .send({ age: '30' });
      expect(res.body.user.age).toBe(30);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Should be return rowCount = 1', async (done) => {
    try {
      const res = await request(app)
        .delete('/api/v1/users/b3ea641e-1281-435c-8af7-059386395338')
        .expect(200)
        .expect('Content-Type', /json/);

      expect(res.body.rowCount).toBe(1);
      return done();
    } catch (error) {
      return done(error);
    }
  });
});

afterAll(() => connection.end());
