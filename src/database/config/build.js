const { readFileSync } = require('fs');
const { join } = require('path');
const connection = require('./connection');

const runBuild = () => {
  let sql = '';
  sql = readFileSync(join(__dirname, './build.sql')).toString();
  if (process.env.NODE_ENV === 'test') {
    const testItem = readFileSync(join(__dirname, './fakeData.sql')).toString();
    sql += testItem;
    return connection.query(sql);
  }
  return connection.query(sql);
};

module.exports = { runBuild };
