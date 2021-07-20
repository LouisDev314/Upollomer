// if not in development environment -> do not parse the dotenv file
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')

// default view path
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')  // setting where views are coming from
app.set('layout', 'layouts/layout')  // all HTML file will follow this customized HTML skeleton layout -> (default) views/layouts/layout.ejs
app.use(expressLayouts)  // allows to create a layout file for all of HTML
app.use(express.static('public'))  // where the public files will go (e.g. stylesheets, js)

// index router
{
    const indexRouter = require('./routes/index')
    app.use('/', indexRouter)
}

// users database REST API
{
    // db connection string/dbName
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    const db = mongoose.connection  // events for connected db
    db.on('error', (error) => console.error(error))
    db.once('open', () => console.log('Connected to Database'))

    // middleware -> called between processing the Request and sending the Response
    app.use(express.json())  // allow server to accept json as a body for get/post request SINCE REST API is a json API

    const usersRouter = require('./routes/users')
    app.use('/users', usersRouter)  // the stuff about users (after that path) will be related to the router module
}

// for the server to tell us what port its listening to
const port = 3000
if (process.env.PORT) {
    port = process.env.PORT
}
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
