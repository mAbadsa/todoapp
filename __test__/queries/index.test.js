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
  getUser,
} = require('../../src/database/queries/index');

beforeAll(() => runBuild());

describe('Database Get Data test', () => {
  test('Get All Todo: Should be return todos.length = 2', async () => {
    const { rows } = await getTodos('5c253f3d-d715-4836-82bf-c073374189dd');
    expect(rows).toHaveLength(2);
    expect(rows[0].todo_content).toBe('make coffee');
  });

  test('Get Specific Todo: Should be return One todo', async () => {
    const { rows } = await getTodo(
      '5c253f3d-d715-4836-82bf-c073374189dd',
      '9c271a2d-beab-41d1-a5ea-b3ea06912742',
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].todo_content).toBe('make coffee');
  });

  test('Get user: Should be return "ahmed"', async () => {
    const { rowCount, rows } = await getUserInfo(
      'b3ea641e-1281-435c-8af7-059386395338',
    );
    expect(rowCount).toBe(1);
    expect(rows[0].username).toBe('ahmed');
  });

  test('Get user: Should be return 5', async () => {
    const { rows, rowCount } = await getAllUser();
    expect(rows[0].username).toBe('muh123');
    expect(rows).toHaveLength(5);
    expect(rowCount).toBe(5);
  });
});

describe('Create Data test', () => {
  test('Create New User Test', async () => {
    const { rowCount } = await addUser({
      username: 'awad02',
      email: 'awad@test.com',
      password: '12345678',
      firstName: 'Awad',
      lastName: 'Alawady',
      age: 20,
    });
    const users = await getAllUser();
    expect(rowCount).toBe(1);
    expect(users.rows).toHaveLength(6);
    expect(users.rows[5].username).toBe('awad02');
  });

  test('Create New Todo Test', async () => {
    const { rowCount, rows } = await addTodo({
      userId: '5c253f3d-d715-4836-82bf-c073374189dd',
      todoContent: 'Go to market',
      importanceLevel: 2,
      taskType: 'House',
    });
    expect(rowCount).toBe(1);
    expect(rows[0].todo_content).toBe('Go to market');
  });
});

describe('Database Update Data test', () => {
  test('Update Todo Test', async () => {
    const { rowCount, rows } = await updateTodo({
      userId: '5c253f3d-d715-4836-82bf-c073374189dd',
      todoId: '9c271a2d-beab-41d1-a5ea-b3ea06912742',
      todoContent: 'Make tea',
      importanceLevel: 3,
      taskType: 'House',
    });
    expect(rowCount).toBe(1);
    expect(rows[0].todo_content).toBe('Make tea');
    expect(rows[0].importance_level).toBe(3);
  });

  test('Update user Test', async () => {
    const { rowCount, rows } = await updateUser({
      userId: 'b3ea641e-1281-435c-8af7-059386395338',
      firstName: 'Ahmed',
      lastName: 'ALahmed',
      age: 18,
      avatarImage: 'https://via.placeholder.com/150',
    });
    expect(rowCount).toBe(1);
    expect(rows[0].first_name).toBe('Ahmed');
  });
});

describe('Database Delete Data test', () => {
  test('Delete Todo Test', async () => {
    const { rowCount, rows } = await deleteTodo(
      '5c253f3d-d715-4836-82bf-c073374189dd',
      '9c271a2d-beab-41d1-a5ea-b3ea06912742',
    );
    const deletedTodo = await getTodo(
      '5c253f3d-d715-4836-82bf-c073374189dd',
      '9c271a2d-beab-41d1-a5ea-b3ea06912742',
    );
    expect(rowCount).toBe(1);
    expect(rows).toHaveLength(0);
    expect(deletedTodo.rowCount).toBe(0);
  });

  test('Delete user Test', async () => {
    const { rowCount } = await deleteUser(
      'b3ea641e-1281-435c-8af7-059386395338',
    );
    const users = await getAllUser();
    const deletedUser = await getUser('ahmed@test.com');
    expect(rowCount).toBe(1);
    expect(users.rows).toHaveLength(5);
    expect(deletedUser.rowCount).toBe(0);
  });
});

afterAll(() => connection.end());
