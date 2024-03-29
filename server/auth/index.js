const router = require('express').Router();
const {
  models: { User },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    const {username, password} = req.body;
    res.send({ token: await User.authenticate({username, password}) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    // const user = await User.create(req.body)

    const { username, password, email, imageURL, address, phoneNumber } =
      req.body;
    const user = await User.create({
      username,
      password,
      email,
      imageURL,
      address,
      phoneNumber,
    });

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
    const user = await User.findByToken(req.headers.authorization);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
