const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register', { layout: false })
});

router.post('/', (req, res) => {
    
});

module.exports = router;