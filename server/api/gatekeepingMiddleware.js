const isAdminMiddleware = (req, res, next) => {
  if (!req.body.username) {
    const err = new Error('Sign up or login!');
    err.status = 401;
    next(err);
  } else if (!req.body.username.isAdmin) {
    const err = new Error(`You aren't authorized to do that`);
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

module.exports = { isAdminMiddleware };
