// REST API for creator CRUD (should be hidden from clients)
const express = require('express');
const router = express.Router(); // make it an express router
const Creator = require('../models/creator'); // the creator model contains all creators
const methodOverride = require('method-override');

// a middleware function to get a creator from db
async function getCreator(req, res, next) {
    let creator;
    try {
      creator = await Creator.findById(req.params.id);
      if (creator === null) {
        console.log('Status 404: Creator not found');
        return res.status(404).json({ message: 'Creator Not Found' });
      }
    } catch (e) {
      console.log('Status 500: ' + e.message);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    // create a variable on the response object
    res.creator = creator;
    next();
}

// Getting all
router.get('/', async (req, res) => {
    try {
      const creators = await Creator.find(); // to get all creators
      res.json(creators);
    } catch (e) {
      console.log('Status 500: ' + e.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Getting one (the colon shows the word 'id' is a parameter)
// getCreator is the middleware here <- execute right after received req
router.get('/:username', getCreator, (req, res) => {
    res.send(res.creator.username);
});

// Updating one (patch instead of put is to update ONLY base on what creators passed in instead of all the information)
router.patch('/:id', getCreator, async (req, res) => {
    if (req.body.email !== null) {
        res.creator.email = req.body.email;
    } else if (req.body.password !== null) {
        res.creator.password = req.body.password;
    }
    try {
        const updatedCreator = await res.creator.save();
        res.json(updatedCreator);
    } catch (e) {
        console.log('Status 400: ' + e.message);
        res.status(400).json({ message: 'Bad Creator Input' });
    }
});

// Deleting one
router.delete('/:id', getCreator, async (req, res) => {
    try {
        await res.creator.remove();
        res.json({ message: 'Creator Deleted' });
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router; // export this module as a router
