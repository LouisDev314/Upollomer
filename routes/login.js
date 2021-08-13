const express = require('express');
const router = express.Router();
const Creator = require('../models/creator');
const flash = require('express-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
router.use(passport.initialize());  // refresh passport middleware every time
router.use(passport.session());

router.get('/', (req, res) => {
    res.render('login', { layout: false })
});

router.post('/', passport.authenticate('local', {
    successRedirect: './views/index',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;