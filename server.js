// if not in development environment -> do not parse the dotenv file
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// npm dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy; // strategy can be against local db or google or FB
const bcrypt = require("bcrypt");
const flash = require("express-flash")
const methodOverride = require('method-override')

// default view path
app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); // setting where views are coming from
app.set("layout", "layouts/layout"); // all HTML file will follow this customized HTML skeleton layout -> (default) views/layouts/layout.ejs
app.use(expressLayouts); // allows to create a layout file for all of HTML
app.use(express.static("public")); // call public files to HTML or ejs (e.g. stylesheets, js, pics)
app.use(express.json()); // allow server to accept json as a body for get/post request from REST API (a json API)

// Routers
{
    app.use("/", require("./routes/index"));
    app.use("/login", require("./routes/login"));
    app.use("/register", require("./routes/register"));
    app.use("/users", require("./routes/users"));
}

// RESTful user database (w/ MVC model)
{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection; // events for connected db
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to Database"));
}

// authentication
{
    app.use(express.urlencoded({ extended: false })); // to access forms from request var in post function from express
    app.use(flash())  // flash message
    app.use(
        session({
        // key that encrypt all information
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        })
    );
    // passport.js
    app.use(passport.initialize());
    app.use(passport.session()); // save the login session
    // when log in -> serialize and deserialize users
    // serialized user will be saved to req.user
    passport.serializeUser((user, done) => done(null, user.id));

}

app.listen(process.env.PORT || 3000, () =>
  console.log(`Listening at http://localhost:3000`)
);
