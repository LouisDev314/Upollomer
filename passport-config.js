const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Creator = require('./models/creator');

async function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = await Creator.findOne({ username: username });
        if (!user) {
            // done(error in this operation, user found)
            return done(null, false, {
                message: 'Incorrect username or password'
            });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Incorrect username or password'
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
    
    // serialize user to the session_id
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // find user in the db to grab it out from the server
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await Creator.findById(userId);
            done(null, user);
        } catch (e) {
            console.log('Deserialize user issue: ' + e.message);
            return done(e);
        }
    });
}

module.exports = initialize;