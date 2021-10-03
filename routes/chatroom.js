const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chatroom/index', {
        title: 'Chatroom —— Upollomer',
    });
});

router.post('/', (req, res) => {
    res.render('chatroom/chat', {
        title: 'Chatroom —— Upollomer',
        
    });
});

module.exports = router;