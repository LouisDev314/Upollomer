const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

async function initialize(passport, getUserByUsername) {
    // username & password here are all sent through the form (submit data)
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username);
        if (user == null) {
            // done(error on server/ with application, user found)
            return done(null, false, {
                message: 'Wrong username or password'
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                // if the password input didn't match
                return done(null, false, {
                    message: 'Wrong username or password'
                });
            }
        } catch (e) {
            console.log(e.message);
            return done(e);
        }
    }
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }), authenticateUser);

    // serialize user to an session_id
    passport.serializeUser((user, done) => {

    });
    passport.deserializeUser((id, done) => {
        
    });
}

module.exports = initialize;