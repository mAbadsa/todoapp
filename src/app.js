const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: './config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(cookieParser());

// test route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, status: 200, message: 'The server is running.' });
});

module.exports = { app };
