const passport = require('passport');
const ObjectId = require('mongodb').ObjectID;
const local = require('./strategies/local.strategy');

module.exports = function passportConfig(app, db) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        (async function() {
            const userObject = {
                _id: ObjectId(id)
            }
            try {
                const user = await db.collection('users').findOne(userObject);
                done(null, user);
            } catch(err) {
                done(err, false);
            }
        }());
    });
    local(db);
}