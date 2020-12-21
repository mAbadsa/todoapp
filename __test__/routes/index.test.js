/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');
const { runBuild } = require('../../src/database/config/build.js');
const connection = require('../../src/database/config/connection');

beforeAll(() => runBuild());
describe('Todo routes test', () => {
  test('Get all todos for specific user should be return 2', (done) => {
    request(app)
      .get('/api/v1/todos')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.todos.length).toBe(2);
        return done();
      });
  });

  test('Get specific todo should be return 1 todo', (done) => {
    request(app)
      .get('/api/v1/todos/5301ea70-1d57-4b70-8c46-4b9657551978')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(res.body.todo.length).toBe(1);
        expect(res.body.todo[0].todo_id).toBe('5301ea70-1d57-4b70-8c46-4b9657551978');
        return done();
      });
  });

  // test('Create new todo should be return new task', (done) => {
  //   request(app)
  //     .post('/api/v1/todos')
  //     .expect(201)
  //     .expect('Content-Type', /json/)
  //     .send({
  //       userId: 1,
  //       todoContent: 'new task',
  //       importanceLevel: 1,
  //       taskType: 'house',
  //     })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body.todo.todo_content).toEqual('new task');
  //       return done();
  //     });
  // });

  // test('Update todo Should be return new task--updated', (done) => {
  //   request(app)
  //     .patch('/api/v1/todos/1')
  //     .expect(200)
  //     .expect('Content-type', /json/)
  //     .send({
  //       todoContent: 'new task--updated',
  //       importanceLevel: 2,
  //       taskType: 'house',
  //     })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body.todos[0].todo_content).toBe('new task--updated');
  //       return done();
  //     });
  // });

  test('Should be return 1', (done) => {
    request(app)
      .delete('/api/v1/todos/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.todos.length).toBe(1);
        return done();
      });
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
      console.log(res.body);
      return done();
    } catch (error) {
      return done(error);
    }
  });

  test('Should be return usersLength = 3', (done) => {
    request(app)
      .post('/api/v1/users')
      .expect(201)
      .expect('Content-Type', /json/)
      .send({
        id: 3,
        username: 'ahmed',
        email: 'test_3@test.com',
        firstName: 'Ahmed',
        lastName: 'Alahmed',
        age: '20',
        avtarImage: 'https://via.placeholder.com/150',
        password: '12345678',
        confirmPassword: '12345678',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.usersLength).toBe(3);
        return done();
      });
  });

  // test('Should be return username = muhammad11', (done) => {
  //   request(app)
  //     .patch('/api/v1/users/5c253f3d-d715-4836-82bf-c073374189dd')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .send({ age: 30 })
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body.user.age).toBe(30);
  //       return done();
  //     });
  // });

  // test('Should be return usersLength = 1', (done) => {
  //   request(app)
  //     .delete('/api/v1/users/2')
  //     .expect(200)
  //     .expect('Content-Type', /json/)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body.usersLength).toBe(2);
  //       return done();
  //     });
  // });
});

afterAll(() => connection.end());
