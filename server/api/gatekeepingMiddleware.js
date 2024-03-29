const {
  models: { User },
} = require('../db');

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // const token = window.localStorage.getItem('token');
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

// const requireToken = async (req, res, next) => {
//   try {
//     // console.log('REQ>>>', req.headers);
//     const token = req.headers.authorization;
//     const { id } = await User.findByToken(token);
//     if (req.user.id === id) {
//       next();
//     } else {
//       res.send('Unauthorized');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// const adminToken = async (req, res, next) => {
//   try {
//     // console.log('REQ>>>', req.headers);
//     const token = req.headers.authorization;
//     const { id, isAdmin } = await User.findByToken(token);
//     if (req.user.id === id && req.user.isAdmin === true) {
//       next();
//     } else {
//       res.send('Unauthorized!');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

const isAdminMiddleware = (req, res, next) => {
  // if(!req.body.username){
  //   const err = new Error('Sign up or login!');
  //   err.status = 401;
  //   next(err)
  // }
  if (!req.headers.authorization && !req.headers.authorization.isAdmin) {
    const err = new Error(`You aren't authorized to do that`);
    err.status = 401;
    next(err);
  } else {
    next();
  }
};

module.exports = { requireToken, isAdminMiddleware };
