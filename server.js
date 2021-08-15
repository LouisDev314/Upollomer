// if not in development environment -> do not parse the dotenv file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// npm dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');

// default view path
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(expressLayouts); // allows to create a layout file for all of HTML
app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIXME: going to be replaced by JWT
const sessionStore = new MongoStore({
    mongoUrl: process.env.DATABASE_URL,
    collection: 'sessions'  // the name of the collection for session storage
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
// check req.session.passport.user !== null for every req <- if an user has logged in
// every if not null -> grab the user id -> deserializeUser to get the user object
// so that req.user is enabled to use
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes (controllers)
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/creator/:username', require('./routes/creator'));
app.use('/co-dreamers', require('./routes/co-dreamers'));
app.use('/ideas', require('./routes/ideas'));
app.use('/search', require('./routes/search'));
app.use('/logout', require('./routes/logout'));

// db connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(process.env.PORT || 3000, () => console.log(`Listening at http://localhost:3000`));
