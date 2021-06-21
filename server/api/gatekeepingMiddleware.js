const isAdminMiddleware = (req, res, next) => {
  if (!req.user) {
    const err = new Error('Sign up or login!');
    err.status = 401;
    next(err);
  } else if (!req.user.isAdmin) {
    const err = new Error(`You aren't authorized to do that`);
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

module.exports = { isAdminMiddleware };
