const { Pool } = require('pg');
require('dotenv').config({ path: './config.env' });

let dbUrl = '';

switch (process.env.NODE_ENV) {
  case 'production':
    dbUrl = process.env.DATABASE_URL;
    break;
  case 'development':
    dbUrl = process.env.DB_URL;
    break;
  case 'test':
    dbUrl = process.env.TEST_DB_URL;
    break;
  default:
    throw new Error('No Database url!!!');
}

const options = {
  connectionString: dbUrl,
  ssl: process.env.NODE_ENV === 'production',
};

module.exports = new Pool(options);
