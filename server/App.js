/**
 * Module dependencies
 */
const express  = require("express")
const session  = require("express-session")
const passport = require("./config/passportconfig")
const LoginRoute = require("./routes/authentication/login.js")
const LogoutRoute = require("./routes/authentication/Logout")
// need for testing
const test = require("./routes/routetest")
/**
 * Local variable
 * @private
 */
const app      = express();
const PORT     = process.env.PORT || 3000

/**
 * Middleware
 */
 app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(session(
   { 
    secret: 'keyboard',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
   }))

app.use(passport.initialize());
app.use(passport.session());

/**
 * Route
 */
app.use("/login", LoginRoute)
app.use("/logout",LogoutRoute)
app.use("/routetest", test)
app.listen(PORT, (err) => {
    if(err) throw err
    else {
        console.log(`Server running on port: ${PORT}`)
    }
})