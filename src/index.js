const { app } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Is listening on port ${port} with url http://localhost:${port}`);
});
