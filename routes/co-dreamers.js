const express = require('express');
const router = express.Router();
const Creator = require('../models/creator');

// All creators
router.get('/', async (req, res) => {
    res.render('co-dreamers/index', {
        layout: 'layouts/co-dreamers',
        creators: await Creator.find()
    })
});

// New creators
router.get('/new', async (req, res) => {
    res.render('co-dreamers/new', { 
        layout: 'layouts/co-dreamers',
        creators: await Creator.find().sort({ date: 'desc' }).limit(25).exec()
    })
});

module.exports = router;