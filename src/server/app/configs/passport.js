const passport = require('passport');
const local = require('./strategies/local.strategy');

module.exports = function passportConfig(app, db) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user)
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    local(db);
}