const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;
const debug = require('debug')('app:passport');
const { getDb } = require('../mongo/database');
const local = require('./strategies/local.strategy');

module.exports = function passportConfig(app) {
  debug('Initialize passport');
  const db = getDb();
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    // eslint-disable-next-line no-underscore-dangle
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    (async function userById() {
      const userObject = {
        _id: ObjectId(id),
      };
      try {
        const user = await db.collection('users').findOne(userObject);
        delete user.password;
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }());
  });
  local(db);
};
