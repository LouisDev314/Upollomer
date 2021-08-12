const express = require('express');
const router = express.Router();
const Creator = require('../models/creator');
const flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.get('/', (req, res) => {
    res.render('login', { layout: false })
});

router.post('/', passport.authenticate('local', {
    successRedirect: './views/index',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;