const express = require('express');
const router = express.Router();
const Idea = require('../models/idea');
const Creator = require('../models/creator');
const authenticated = require('../passport/authenticated');
const coverImgMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
const devLogMimeTypes = ['text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
// const upload = multer({
//     dest: (req, file, cb) => {
//         if (file.fieldname === 'coverImg') {
//             cb(null, coverImgUploadPath);
//         } else {
//             cb(null, devLogUploadPath);
//         }
//     },
//     fileFilter: (req, file, cb) => {
//         if (file.fieldname === 'coverImg') {
//             cb(null, coverImgMimeTypes.includes(file.mimetype));
//         } else {
//             cb(null, devLogMimeTypes.includes(file.mimetype));
//         }
//     }
// });

// All ideas route <- get req send through path query
router.get('/', async (req, res) => {
    try {
        res.render('ideas/index', {
            // FIXME: use req.params instead
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

// directly save file inside the idea with Buffer
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
        // FIXME: get value from select option
        category: req.body.category,
        genre: req.body.genre,
        title: req.body.title,
        description: req.body.description,
        // FIXME: import all countries in the world
        region: req.body.region,
        status: req.body.status,
        coDreamer: req.body.coDreamer    
    });

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
