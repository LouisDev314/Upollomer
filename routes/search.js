const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const Creator = require('../models/creator');

// Get the thing user searched
router.get('/', async (req, res) => {
    let ideaSearchOptions = {};
    let creatorSearchOptions = {};
    if (req.query.search != null && req.query.search !== '') {
        // RegExp is regular expression -> allows search by keywords & 'i' means case insensitive
        ideaSearchOptions.title = new RegExp(req.query.search, 'i', 'g');
        creatorSearchOptions.username = new RegExp(req.query.search, 'i', 'g');
    }
    try {
        const ideas = await Idea.find(ideaSearchOptions);
        const creators = await Creator.find(creatorSearchOptions);
        res.render('search', {
            ideas: ideas,
            creators: creators,
            searchOptions: req.query.search
        });
    } catch (e) {
        console.log('Search Error: ' + e.message);
        res.redirect('ideas');
    }
});

module.exports = router;