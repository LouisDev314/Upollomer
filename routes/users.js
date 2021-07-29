// REST API for user CRUD (should be hidden from clients)

const express = require('express')
const router = express.Router()  // make it an express router
const User = require('../models/user')  // the user model contains all users

// a middleware function to get a user from db
async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (user === null) {
            console.log('Status 404: User not found')
            return res.status(404).json({ message: 'User Not Found'})
        }
    } catch (e) {
        console.log('Status 500: ' + e.message)
        return res.status(500).json({ message: 'Internal Server Error'})
    }
    // create a variable on the response object
    res.user = user
    next()
}

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find() // to get all users
        res.json(users)
    } catch (e) {
        console.log('Status 500: ' + e.message)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})

// Getting one (the colon shows the word 'id' is a parameter)
// getUser is the middleware here <- execute right after received req
router.get('/:id', getUser, (req, res) => {
    res.send(res.user.username)
})

// Creating one
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    try {
        const newUser = await user.save()  // persist that into db
        res.status(201).json(newUser)  // status 201 means created something successfully
    } catch (e) {
        console.log('Status 400: ' + e.message)
        res.status(400).json({ message: 'Bad User Input'})
    }
})

// Updating one (patch instead of put is to update ONLY base on what users passed in instead of all the information)
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email !== null) {
        res.user.email = req.body.email
    }
    else if (req.body.password !== null) {
        res.user.password = req.body.password
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (e) {
        console.log('Status 400: ' + e.message)
        res.status(400).json({ message: 'Bad User Input'})
    }
})

// Deleting one
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'User Deleted'})
    } catch (e) {
        res.status(500).json({ message: 'Internal Server Error'})
    }
})

module.exports = router  // export this module as a router
