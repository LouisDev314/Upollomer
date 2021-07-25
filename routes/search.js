const express = require('express');
const router = express.Router();
const Idea = require('../models/ideas')

// Get the thing user searched
router.get('/', async (req, res) => {
    let searchOptions = {};
    if (req.query.search != null && req.query.search !== '') {
        // RegExp is regular express -> allows search by keywords & 'i' means case insensitive
        searchOptions.title = new RegExp(req.query.search, 'i', 'g');
    }
    try {
        const ideas = await Idea.find(searchOptions);
        res.render('search', {
            layout: 'layouts/search',
            ideas: ideas,
            searchOptions: req.query
        });
    } catch {
        res.redirect('ideas');
    }
});

module.exports = router;