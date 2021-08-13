const express = require('express');
const router = express.Router();
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const Creator = require('../models/creator');
const session = require('express-session');
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
router.use(flash());

var mismatch;
var existed;

router.get('/', (req, res) => {
    let string = 'init';
    if (mismatch) {
        string = 'mismatch_pw';
    } else if (existed) {
        string = 'user_existed';
    }
    res.render('register', {
        layout: false,
        message: req.flash(string)
    });
});

router.post('/', async (req, res) => {
    req.flash('init', '');
    mismatch = false;
    existed = false;
    if (req.body.password !== req.body.r_password) {
        req.flash('mismatch_pw', 'Mismatched password. Please enter the same password twice.');
        mismatch = true;
        return res.redirect('/register');
    }
    try {
        const creatorExist = await Creator.findOne({ username: req.body.username });
        if (creatorExist) {
            req.flash('user_existed', 'Username already exists.');
            existed = true;
            return res.redirect('/register');
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newCreator = new Creator({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newCreator.save();
        res.redirect('/login');
    } catch (e) {
        console.log('Status 400: ' + e.message);
        res.redirect('/register');
    }
});

module.exports = router;