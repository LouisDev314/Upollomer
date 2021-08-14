const express = require('express');
const router = express.Router();
const passport = require('passport');

const initializePassport = require('../passport-config');
initializePassport(passport);

router.get('/', (req, res) => {
    res.render('login', { layout: false });
});

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true,
}));

module.exports = router;
