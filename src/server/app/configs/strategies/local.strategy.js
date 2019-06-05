const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const debug = require('debug')('app:passport-local');
const userModel = require('../../../models/user');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password',
    }, async (username, password, done) => {
      const user = {
        username,
      };
      try {
        const userByUsername = await userModel.findOne(user).lean();
        if (userByUsername) {
          const match = await bcrypt.compare(password, userByUsername.password);
          if (!match) {
            done(null, false);
          } else {
            delete userByUsername.password;
            done(null, userByUsername);
          }
        } else {
          done(null, false);
        }
      } catch (err) {
        done(null, false);
        debug(err.stack);
      }
    },
  ));
};
