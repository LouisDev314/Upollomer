const express = require('express');
const router = express.Router();
const authenticated = require('../passport/authenticated');

router.get('/', (req, res) => {
    // if (!req.user.username) {
    //     res.render('index');
    // } else {
    //     res.render('index', {
    //         layout: 'layouts/authLayout',
    //         username: req.user.username
    //     });
    // }
    res.render('index');
});

module.exports = router;