/* eslint-disable no-undef */
const connection = require('../../src/database/config/connection');
const { runBuild } = require('../../src/database/config/build.js');
const {
  getSpecificTodo,
} = require('../../src/database/queries/getData');
const { addUser, addTodo } = require('../../src/database/queries/addData');

beforeAll(() => runBuild());

// test('Testing get all todo', () => getAllTodos().then(({ rows }) => {
//   console.log(rows);
//   expect(rows[0].todo_content).toEqual('make coffee');
// }));

test('Testing get specific todo', () => getSpecificTodo(1).then(({ rows }) => {
  // console.log(rows);
  expect(rows.length).toBe(2);
}));

afterAll(() => connection.end());
