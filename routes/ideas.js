const express = require('express');
const ideas = require('../models/ideas');
const router = express.Router()
const Idea = require('../models/ideas')

// All ideas route
router.get('/', (req, res) => {
    res.render('ideas/index', { layout: 'layouts/ideas' });
});

// New idea route
router.get('/new', (req, res) => {
    res.render('ideas/new', { layout: 'layouts/ideas' });
    
});

// Top idea route
router.get('/top', (req, res) => {
    res.render('ideas/top', { layout: 'layouts/ideas' });
});

// Create idea route
router.post('/', (req, res) => {

});



module.exports = router;