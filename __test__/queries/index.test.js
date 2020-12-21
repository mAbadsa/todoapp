/* eslint-disable no-undef */
const connection = require('../../src/database/config/connection');
const { runBuild } = require('../../src/database/config/build.js');
const {
  getTodos,
  getUserInfo,
  getTodo,
  getAllUser,
  addUser,
  addTodo,
  updateTodo,
  updateUser,
  deleteTodo,
  deleteUser,
} = require('../../src/database/queries/index');

beforeAll(() => runBuild());

describe('Database GetData test', () => {
  test('Get All Todo: Should be return todos.length = 2', async () => {
    const { rows } = await getTodos('5c253f3d-d715-4836-82bf-c073374189dd');
    expect(rows.length).toBe(2);
  });

  test('Get All Todo: Should be return todos.length = 2', async () => {
    const { rows } = await getTodo(
      '5c253f3d-d715-4836-82bf-c073374189dd',
      '9c271a2d-beab-41d1-a5ea-b3ea06912742',
    );
    expect(rows.length).toBe(1);
  });

  test('Get user: Should be return "muh123"', async () => {
    const res = await getUserInfo('5c253f3d-d715-4836-82bf-c073374189dd');
    expect(res.rows[0].username).toBe('muh123');
  });

  test('Get user: Should be return "muh123"', async () => {
    const res = await getAllUser();
    expect(res.rows.length).toBe(2);
  });
});

describe('Database Create Data test', () => {
  test('Create New User Test', async () => {
    const { rowCount } = await addUser({
      username: 'Ali',
      email: 'ali@test.com',
      password: '12345678',
      firstName: 'ali',
      lastName: 'Alioua',
      age: 20,
    });
    expect(rowCount).toBe(1);
  });

  test('Create New Todo Test', async () => {
    const { rowCount } = await addTodo({
      userId: '5c253f3d-d715-4836-82bf-c073374189dd',
      todoContent: 'Go to market',
      importanceLevel: 2,
      taskType: 'House',
    });
    expect(rowCount).toBe(1);
  });
});

describe('Database Update Data test', () => {
  test('Update Todo Test', async () => {
    const { rowCount } = await updateTodo({
      userId: '5c253f3d-d715-4836-82bf-c073374189dd',
      todoId: '9c271a2d-beab-41d1-a5ea-b3ea06912742',
      todoContent: 'Make tea',
      importanceLevel: 3,
      taskType: 'House',
    });
    expect(rowCount).toBe(1);
  });

  test('Update user Test', async () => {
    const { rowCount } = await updateUser({
      userId: 'b3ea641e-1281-435c-8af7-059386395338',
      firstName: 'Ahmed',
      lastName: 'ALahmed',
      age: 18,
    });
    expect(rowCount).toBe(1);
  });
});

describe('Database Delete Data test', () => {
  test('Delete Todo Test', async () => {
    const { rowCount } = await deleteTodo(
      '9c271a2d-beab-41d1-a5ea-b3ea06912742',
    );
    expect(rowCount).toBe(1);
  });

  test('Delete user Test', async () => {
    const { rowCount } = await deleteUser(
      'b3ea641e-1281-435c-8af7-059386395338',
    );
    expect(rowCount).toBe(1);
  });
});

afterAll(() => connection.end());
