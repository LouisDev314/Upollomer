const express = require('express');
const router = express.Router();
const Idea = require('../models/ideas');

// All ideas route <- get req send through path query
router.get('/', async (req, res) => {
    try {
        const ideas = await Idea.find();
        res.render(
            'ideas/index', { 
                layout: 'layouts/ideas',
                ideas: ideas
            }
        );
    } catch {
        res.redirect('/');
    }
});

// New idea route
router.get('/new', (req, res) => {
    res.render('ideas/new', { layout: 'layouts/ideas' });
});

// Top idea route
router.get('/top', (req, res) => {
    res.render('ideas/top', { layout: 'layouts/ideas' });
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
        title: req.body.title,
        description: req.body.description
    });
    try {
        const newIdea = await idea.save();
        // element on the page changes -> use redirect \else use render
        // res.redirect(`ideas/${newIdea.id}`)
        res.redirect('ideas/index');
    } catch {
        res.render('ideas/create', {
            idea: idea,
            errorMessage: 'Cannot implement this idea'
        });
    }
});

module.exports = router;
