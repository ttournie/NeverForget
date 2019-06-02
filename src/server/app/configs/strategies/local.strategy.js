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
                console.log(err.stack);
            }
        }
    ));
};