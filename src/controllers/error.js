// eslint-disable-next-line no-unused-vars
exports.serverErrors = (err, req, res, next) => {
  console.log(err);
  return res.status(err.status || 500).json({
    success: false,
    message: err.msg,
    statusCode: err.status,
  });
};
