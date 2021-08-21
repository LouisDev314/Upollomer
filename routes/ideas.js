const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const path = require('path');  // node.js core module
const fs = require('fs');
const coverImgUploadPath = path.join('public', Idea.coverImgBasePath);
const devLogUploadPath = path.join('public', Idea.devLogBasePath);
const Creator = require('../models/creator');
const authenticated = require('../passport/authenticated');
const multer = require('multer');
const coverImgMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const devLogMimeTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
const upload = multer({
    dest: (req, file, cb) => {
        if (file.fieldname === 'coverImg') {
            cb(null, coverImgUploadPath);
        } else {
            cb(null, devLogUploadPath);
        }
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'coverImg') {
            cb(null, coverImgMimeTypes.includes(file.mimetype));
        } else {
            cb(null, devLogMimeTypes.includes(file.mimetype));
        }
    }
});

// All ideas route <- get req send through path query
router.get('/', async (req, res) => {
    try {
        res.render('ideas/index', {
            route: req.originalUrl,
            layout: 'layouts/ideas',
            ideas: await Idea.find()
        });
    } catch {
        res.redirect('/');
    }
});

router.get('/new', async (req, res) => {
    try {
        res.render('ideas/new', {
            route: req.originalUrl,
            layout: 'layouts/ideas',
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
            route: req.originalUrl,
            layout: 'layouts/ideas',
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
            message: req.flash('postIdeaErr')
        });
    } catch (e) {
        console.log('create idea error: ' + e.message);
        res.redirect('ideas');
    }
});

// req.body here is the form that post to this route
router.post('/', upload.fields([{ name: 'coverImg', maxCount: 1 }, { name: 'devLog', maxCount: 1 }]), async (req, res) => {
    const coverImgFileName = req.files['coverImg'] ? req.files['coverImg'][0].filename : null;
    const devLogFileName = req.files['devLog'] ? req.files['devLog'][0].filename : null;
    const idea = new Idea({
        // FIXME: get value from select option
        category: req.body.category,
        genre: req.body.genre,
        title: req.body.title,
        description: req.body.description,
        // FIXME: import all countries in the world
        region: req.body.region,
        status: req.body.status,
        coverImgName: coverImgFileName,
        devLogName: devLogFileName,
        coDreamer: req.body.coDreamer    
    });
    
    try {
        const newIdea = await idea.save();
        // res.redirect(`ideas/${newIdea.id}`)
        res.redirect('ideas');
    } catch (e) {
        console.log('idea post error: ' + e.message);
        req.flash('postIdeaErr', 'Cannot implement this idea.');
        if (idea.coverImgName != null) {
            fs.unlink(path.join(coverImgUploadPath, idea.coverImgName), (err) => {
                if (err) console.error(err);
            });
        }
        if (idea.devLogName) {
            fs.unlink(path.join(devLogUploadPath, idea.devLogName), (err) => {
                if (err) console.error(err);
            });
        }
        res.redirect('ideas/create');
    }
});

module.exports = router;
