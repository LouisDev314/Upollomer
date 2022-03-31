const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('chatroom/index', {
        layout: 'layouts/authLayout',
        title: 'Chatroom —— Upollomer',
    });
});

router.post('/', (req, res) => {
    res.render('chatroom/chat', {
        layout: 'layouts/authLayout',
        title: 'Chatroom —— Upollomer',
        
    });
});

module.exports = router;