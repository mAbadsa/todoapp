exports.httpErrors = (msg, statusCode) => {
  const err = new Error();
  err.msg = msg;
  err.status = statusCode;
  return err;
};
