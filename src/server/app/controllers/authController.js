const bcrypt = require('bcrypt');
const debug = require('debug')('app:auth');
const userModel = require('../../models/user');

const saltRounds = 10;

async function addUserAndLogin(user, req, res, next) {
  try {
    const newUser = await userModel.create(user);
    req.login(newUser, () => {
      res.json({ user: newUser });
    });
    res.end();
  } catch (err) {
    debug('error while creating a user');
    next(err);
  }
}

function subscribe(req, res, next) {
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
        addUserAndLogin(user, req, res, next);
      }
    });
}

function getLoggedUserInfo(req, res) {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.status(401).end();
  }
}

function logout(req, res) {
  req.logout();
  res.end();
}

const userController = {
  subscribe,
  logout,
  getLoggedUserInfo,
};

module.exports = userController;
