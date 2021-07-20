const express = require('express')
const router = express.Router()

router.get('/search', (req, res) => {
    res.send('Searching through the web now...')
})

module.exports = router