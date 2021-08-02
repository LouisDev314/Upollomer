const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');

// All ideas route <- get req send through path query
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.render('ideas/index', {
            route: req.originalUrl,
            layout: 'layouts/ideas',
            ideas: ideas
        });
    } catch {
        res.redirect('/');
    }
});

// New idea route
router.get('/new', (req, res) => {
    res.render('ideas/new', {
        route: req.originalUrl,  // this is for selection box selected dynamically
        layout: 'layouts/ideas'
    });
});

// Top idea route
router.get('/top', (req, res) => {
    res.render('ideas/top', {
        route: req.originalUrl,
        layout: 'layouts/ideas'
    });
});

// Going to create a new idea project
router.get('/create', (req, res) => {
    res.render(
        'ideas/create',
        // create an idea object for manipulation in db
        { idea: new Idea() }
    );
});

// Implement new idea route <- the req.body here is the form post to this route
// post req send through body
router.post('/', async (req, res) => {
    const idea = new Idea({
        // category: req.body.category,
        // genre: req.body.genre,
        title: req.body.title,
        description: req.body.description,
        // region: req.body.region,
        // status: req.body.status
    });
    try {
        const newIdea = await idea.save();
        // element on the page changes -> use redirect \else use render
        // res.redirect(`ideas/${newIdea.id}`)
        res.redirect('ideas');
    } catch (e) {
        console.log(e.message);
        res.render('ideas/create', {
            idea: idea,
            errorMessage: 'Cannot implement this idea'
        });
    }
});

module.exports = router;
