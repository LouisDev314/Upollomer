const express = require('express');
const router = express.Router();
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const Creator = require('../models/creator');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

router.get('/', (req, res) => {
    res.render('register', { layout: false });
});

router.post('/', async (req, res) => {
    if (req.body.password !== req.body.r_password) {
        // TODO: flash: 'Mismatched password. Please enter the same password twice.'
        return res.redirect('/register');
    }
    try {
        const creatorExist = await Creator.findOne({ username: req.body.username });
        if (creatorExist) {
            // TODO: flash: 'Username already exists.'
            return res.redirect('/register');
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newCreator = new Creator({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newCreator.save();
        // TODO: flash: 'Profile created successfully!'
        res.redirect('/login');
    } catch (e) {
        console.log('Status 400: ' + e.message);
        res.redirect('/register');
    }
});

module.exports = router;