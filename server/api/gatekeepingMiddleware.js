const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    console.log('REQUIRETOKEN>>>', req.headers);
    const token = req.headers.authorization;
    // const token = window.localStorage.getItem('token');
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = { requireToken };
