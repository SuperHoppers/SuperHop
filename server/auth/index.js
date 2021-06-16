const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const user = await User.create(req.body);
=======
    // const user = await User.create(req.body)
    const { username, password } = req.body;
    const user = await User.create({ username, password });
>>>>>>> 8c148ea1bd3d833732d91e64f7cbdaf0382a5c87
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization, {
      attributes: ['id', 'username'],
    });
    res.send(user);

  } catch (ex) {
    next(ex);
  }
});
