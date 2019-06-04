const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:user');
const { getDb } = require('..//mongo/database');

const saltRounds = 10;
const router = express.Router();

async function addUser(db, user, req, res, next) {
  try {
    const result = await db.collection('users').insertOne(user);
    req.login(result.ops[0], () => {
      res.json({ user: result.ops[0] });
    });
    res.end();
  } catch (err) {
    debug('error while creating a user');
    next(err);
  }
}

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).end();
  }
});

router.get('/logout', (req, res) => {
  req.logout();
  res.end();
});

router.post('/', (req, res, next) => {
  const db = getDb();
  let { password } = req.body;
  bcrypt.hash(password, saltRounds,
    (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        password = hashedPassword;
        const user = {
          username: req.body.username,
          password: hashedPassword,
        };
        addUser(db, user, req, res, next);
      }
    });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

module.exports = router;
