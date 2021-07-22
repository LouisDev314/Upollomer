const express = require('express');
const router = express.Router();

// All creators
router.get('/', (req, res) => {
    res.render('creators/index')
});

// New creators
router.get('/new', (req, res) => {
    res.render('creators/new')
});

// Create creator route
router.post('/', (req, res) => {
    res.send('Creating a creator')
});

module.exports = router;