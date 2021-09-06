const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const Creator = require('../models/creator');
const authenticated = require('../passport/authenticated');
const coverImgMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const devLogMimeTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];

const category = ['Video Game', 'Board game', 'Technology', 'Engineering'];

// <div><%= idea.date.toISOString().split('T')[0] %></div>

// TODO: team-up function after there are two or more creators for an idea
// TODO: dynamic title show & remove head from each page


// FIXME: optimize searching options with category and genre included
// FIXME: change to dynamic title showing
router.get('/', async (req, res) => {
    try {
        res.render('ideas/index', {
            hitSelected: 'selected',
            layout: 'layouts/ideas',
            ideas: await Idea.find(),
            category: category
        });
    } catch {
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('ideas/new', {
            newSelected: 'selected',
            layout: 'layouts/ideas',
            category: category,
            ideas: await Idea.find().sort({ date: 'desc' }).limit(25).exec()
        });
    } catch (e) {
        console.log(e.message);
        res.redirect('/');
    }
});

router.get('/top', async (req, res) => {
    try {
        res.render('ideas/top', {
            topSelected: 'selected',
            layout: 'layouts/ideas',
            category: category,
            ideas: await Idea.find()
        });
    } catch (e) {
        console.log(e.message);
        res.redirect('/');
    }
});

// TODO: add a promotion page to guide user to login page
router.get('/create', authenticated, async (req, res) => {
    try {
        res.render('ideas/create', {
            // Create an Idea object for creation (adding properties to it)
            idea: new Idea(),
            // TODO: friend list function?
            creators: await Creator.find(),
            message: req.flash('postIdeaErr'),
            category: category
        });
    } catch (e) {
        console.log('create idea error: ' + e.message);
        res.redirect('ideas');
    }
});

// directly save file inside the idea as a Buffer
// FIXME: image transform
function saveIdeaFiles(idea, coverImgEncoded, devLogEncoded) {
    if (!coverImgEncoded && !devLogEncoded) {
        return;
    }
    let coverImg;
    let devLog;
    // to parse the base 64 encoded JSON string from filepond to a JS understandable JSON object
    if (coverImgEncoded) {
        coverImg = JSON.parse(coverImgEncoded);
    }
    if (devLogEncoded) {
        devLog = JSON.parse(devLogEncoded);
    }
    if (coverImg && coverImgMimeTypes.includes(coverImg.type)) {
        // convert to buffer from base64 encoded JSON object property
        idea.coverImg = new Buffer.from(coverImg.data, 'base64');
        idea.coverImgType = coverImg.type;
    }
    if (devLog && devLogMimeTypes.includes(devLog.type)) {
        idea.devLog = new Buffer.from(devLog.data, 'base64');
        idea.devLogType = devLog.type;
    }
}
router.post('/', async (req, res) => {
    const idea = new Idea({
        category: req.body.category,
        genre: req.body.genre,
        title: req.body.title,
        description: req.body.description,
        country: req.body.country,
        region: req.body.region,
        status: req.body.status,
        coDreamer: req.body.coDreamer    
    });
    // FIXME: fix devLog upload
    try {
        saveIdeaFiles(idea, req.body.coverImg, req.body.devLog);
        const newIdea = await idea.save();
        // res.redirect(`ideas/${newIdea.id}`)
        res.redirect('ideas');
    } catch (e) {
        console.log('idea post error: ' + e.message);
        req.flash('postIdeaErr', 'Cannot implement this idea.');
        res.redirect('ideas/create');
    }
});

module.exports = router;