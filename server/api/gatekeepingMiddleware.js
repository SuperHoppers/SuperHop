const isAdminMiddleware = (req, res, next) => {
  if (!req.headers.authorization.isAdmin) {
    const err = new Error(`You aren't authorized to do that`);
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

const isUserMiddleware = (req, res, next) => {
  if (!req.headers.authorization.id) {
    const err = new Error();
    // `You aren't authorized to do that as a guest, or to someone else\'s information. Please log in. Or, if this is not you, stop trying to find someone else\'s address. We do not give away secret lair information here.`
    err.status = 401;
    next(err);
  } else {
    next();
  }
};
module.exports = { isAdminMiddleware, isUserMiddleware };
