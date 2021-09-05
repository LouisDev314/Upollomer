const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const Creator = require('../models/creator');

const category = ['Video Game', 'Board game', 'Technology', 'Engineering'];

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
        let searchCreators = true;
        if (req.query.search == null || req.query.search === '') {
            searchCreators = false;
        }
        const ideas = await Idea.find(ideaSearchOptions);
        const creators = await Creator.find(creatorSearchOptions);
        res.render('search', {
            layout: 'layouts/ideas',
            ideas: ideas,
            creators: creators,
            category: category,
            searchOptions: req.query.search,
            searchCreators: searchCreators
        });
    } catch (e) {
        console.log('Search Error: ' + e.message);
        res.redirect('ideas');
    }
});

module.exports = router;