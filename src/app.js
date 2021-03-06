const { join } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const { createStream } = require('rotating-file-stream');
const morgan = require('morgan');

require('dotenv').config({ path: './config.env' });

const { todoRoutes, userRoutes, adminRoutes } = require('./routers/index');
const { serverErrors } = require('./controllers/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, '..', 'public')));
app.use(cookieParser());

// log all requests in the Apache combined format to the file access.log.
// create a write stream (in append mode)
const accessLogStream = createStream('access.log', {
  interval: '1d',
  size: '2M',
  path: join(__dirname, 'log'),
});
// setup looger
app.use(morgan('combined', { stream: accessLogStream }));

// test route
app.get('/', (req, res) => {
  res.status(200).json({ success: true, status: 200, message: 'The server is running.' });
});

app.use('/api/v1', todoRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', adminRoutes);

app.use((req, res) => res.status(404).json({
  success: false,
  statusCode: 404,
  message: 'Page not found!',
}));

app.use(serverErrors);

module.exports = app;
