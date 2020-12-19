/* eslint-disable no-undef */
const request = require('supertest');

const app = require('../../src/app');

describe('Todo routes test', () => {
  test('should be return [{userId: 1, todo_content: "task-one", ImportanceLevel: 1, taskType: "house",createdAt: "10-12-2020"}]', (done) => {
    request(app)
      .get('/api/v1//todos/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.todo).toEqual({
          userId: 1,
          id: 1,
          todo_content: 'task-one',
          ImportanceLevel: 1,
          taskType: 'house',
          createdAt: '10-12-2020',
        });
        return done();
      });
  });

  test('should be return [{userId: 1, todo_content: "task-one", ImportanceLevel: 1, taskType: "house",createdAt: "10-12-2020"}, {userId: 1, todo_content: "task-two", ImportanceLevel: 3,  taskType: "office", createdAt: "10-12-2020"}]', (done) => {
    request(app)
      .get('/api/v1//todos')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.todos).toEqual([
          {
            userId: 1,
            id: 1,
            todo_content: 'task-one',
            ImportanceLevel: 1,
            taskType: 'house',
            createdAt: '10-12-2020',
          },
          {
            userId: 1,
            id: 2,
            todo_content: 'task-two',
            ImportanceLevel: 3,
            taskType: 'office',
            createdAt: '10-12-2020',
          },
        ]);
        return done();
      });
  });

  test('should be return new task', (done) => {
    request(app)
      .post('/api/v1/todos')
      .expect(201)
      .expect('Content-Type', /json/)
      .send({
        userId: 1,
        todoContent: 'new task',
        ImportanceLevel: 1,
        taskType: 'house',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.todo.todoContent).toEqual('new task');
        return done();
      });
  });

  test('Should be return new task--updated', (done) => {
    request(app)
      .patch('/api/v1/todos/1')
      .expect(200)
      .expect('Content-type', /json/)
      .send({
        todoContent: 'new task--updated',
        ImportanceLevel: 2,
        taskType: 'house',
        createdAt: '10-12-2020',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.todos[0].todoContent).toBe('new task--updated');
        return done();
      });
  });

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
  test('Should be return muhammad', (done) => {
    request(app)
      .get('/api/v1/users/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.user.username).toBe('muhammad');
        return done();
      });
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
        birthDay: '12-12-2020',
        avtarImage: 'https://via.placeholder.com/150',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.usersLength).toBe(3);
        return done();
      });
  });

  test('Should be return username = muhammad11', (done) => {
    request(app)
      .patch('/api/v1/users/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .send({ username: 'muhammad11' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.user.username).toBe('muhammad11');
        return done();
      });
  });

  test('Should be return usersLength = 1', (done) => {
    request(app)
      .delete('/api/v1/users/2')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.usersLength).toBe(2);
        return done();
      });
  });
});
