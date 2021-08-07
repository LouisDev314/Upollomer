const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.get('/', (req, res) => {
    res.render('login', { layout: false })
});

router.post('/', (req, res) => {

});

module.exports = router;