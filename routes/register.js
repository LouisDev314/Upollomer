const express = require('express');
const router = express.Router();
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const Creator = require('../models/creator');
const passport = require('passport');



router.get('/', (req, res) => {
    res.render('register', { layout: false });
});

router.post('/', async (req, res) => {
    if (req.body.password !== req.body.r_password) {
        req.flash('error', 'Mismatched password. Please enter the same password twice.');
        res.redirect('/');
    }
    try {
        const userExist = await Creator.findOne(req.body);
        if (userExist) {
            req.flash('error', 'Username already exists.');
            return res.redirect('/');
        }
        const hash = await bcrypt.hash(req.body.password, 10);
        const newCreator = new Creator({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newCreator.save();
        
        // req.session.creator = newCreator;
        // req.flash('success', 'Registered profile successfully!');

        res.redirect('/login');
    } catch (e) {
        console.log('Status 400: ' + e.message);
        res.redirect('/');
    }
});

module.exports = router;