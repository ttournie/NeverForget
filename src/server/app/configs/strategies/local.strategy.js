const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');

module.exports = function localStrategy(db) {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password',
        }, async (username, password, done) => {
            const user = {
                username: username,
            }
            try {
                const userByUsername = await db.collection('users').findOne(user);

                if (userByUsername) {
                    bcrypt.compare(password, userByUsername.passport, function(err) {
                        if (err) {
                            done(null, userByUsername);
                        } else {
                            done(null, false);
                        }
                      });
                } else {
                    done(null, false);
                }
            } catch (err) {
                console.log(err.stack);
            }
        }
    ));
};