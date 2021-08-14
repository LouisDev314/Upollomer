const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Creator = require('./models/creator');

function initialize(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = await Creator.findOne({ username: username });
        if (!user) {
            // done(error in this operation, user found)
            return done(null, false, { message: 'Invalid username or password.' });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Invalid username or password.' });
            }
        } catch (err) {
            console.log('Authenticate user error: ' + e.message);
            return done(err);
        }
    }
    
    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, authenticateUser));
    
    // after authenticated = got user object -> serialize the information in the user object to session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    // retrieve user information from db through the user id -> save to req.user
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Creator.findById(id);
            done(null, user);
        } catch (err) {
            console.log('Deserialize user issue: ' + e.message);
            return done(err);
        }
    });
}

module.exports = initialize;