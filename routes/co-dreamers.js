const express = require('express');
const router = express.Router();

// All creators
router.get('/', (req, res) => {
    res.render('co-dreamers/index')
});

// New creators
router.get('/new', (req, res) => {
    res.render('co-dreamers/new')
});

module.exports = router;