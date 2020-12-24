// eslint-disable-next-line no-unused-vars
exports.serverErrors = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('httpError::--', err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.msg,
    statusCode: err.status,
  });
};
