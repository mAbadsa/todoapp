/* eslint-disable no-unused-vars */
exports.serverErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.msg,
    statusCode: err.status,
  });
};
