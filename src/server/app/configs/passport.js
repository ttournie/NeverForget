const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;
const debug = require('debug')('app:passport');
const userModel = require('../../models/user');
const local = require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  debug('Initialize passport');
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    (async function userById() {
      try {
        const user = await userModel.findOne({ _id: ObjectId(id) }).lean();
        delete user.password;
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }());
  });
  local();
};
