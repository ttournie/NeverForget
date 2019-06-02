const passport = require('passport');
const { Strategy } = require('passport-local');
const md5 = require('md5');

module.exports = function localStrategy(db) {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        }, async (username, password, done) => {
            const user = {
                username: username,
                password: md5(password),
            }
            try {
                const LoggedUser = await db.collection('users').findOne(user);
                if (LoggedUser) {
                    done(null, LoggedUser);
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log(err.stack);
            }
        }
    ));
};