const express = require('express');
const router = express.Router();
const authenticated = require('../passport/authenticated');

router.get('/', authenticated, (req, res) => {
    if (!req.user) {
        res.render('index');
    } else {
        res.render('index', {
            layout: 'layouts/authLayout',
            username: req.user.username
        });
    }
});

module.exports = router;