/* eslint-disable no-undef */
const connection = require('../../src/database/config/connection');
const { runBuild } = require('../../src/database/config/build.js');
const { getAllTodosByUserId, getUserInfo, getSingleTodoByTodoId } = require('../../src/database/queries/getData');

beforeAll(() => runBuild());

describe('Databse CRUD operation test', () => {
  test('Get All Todo: Should be return todos.length = 2', async () => {
    const { rows } = await getAllTodosByUserId('5c253f3d-d715-4836-82bf-c073374189dd');
    expect(rows.length).toBe(2);
  });

  test('Get All Todo: Should be return todos.length = 2', async () => {
    const { rows } = await getSingleTodoByTodoId('5c253f3d-d715-4836-82bf-c073374189dd', '9c271a2d-beab-41d1-a5ea-b3ea06912742');
    expect(rows.length).toBe(1);
  });

  test('Get user: Should be return "muh123"', async () => {
    const res = await getUserInfo('5c253f3d-d715-4836-82bf-c073374189dd');
    return expect(res.rows[0].username).toBe('muh123');
  });
});

afterAll(() => connection.end());
