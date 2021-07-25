const express = require('express');
const router = express.Router();

// All creators
router.get('/', (req, res) => {
    res.render('co-dreamers/index', { layout: 'layouts/co-dreamers' })
});

// New creators
router.get('/new', (req, res) => {
    res.render('co-dreamers/new', { layout: 'layouts/co-dreamers' })
});

module.exports = router;