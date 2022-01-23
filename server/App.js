/**
 * Module dependencies
 */
const express  = require("express")
const session  = require("express-session")
const passport = require("./config/passportconfig")
/**
 * Local variable
 * @private
 */
const app      = express();
const PORT     = process.env.PORT || 3000

/**
 * Middleware
 */
app.use(session(
   { 
    secret: 'keyboard',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true
   }))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

/**
 * Route
 */
app.post("/login",
    (req, res, next) => {
        passport.authenticate(
            'local',
            (err, user) => {
                if(!user) {return res.send("authentication faile")}
                else return res.send("authenticated")
            }
        )(req, res, next)
    },
    (req, res) => {
        console.log(req.session);
        res.send(`hello ${req.user.id}`);
    })
app.get("/faillogin", (req, res) => {
    res.send("wrong user")
})

app.listen(PORT, (err) => {
    if(err) throw err
    else {
        console.log(`Server running on port: ${PORT}`)
    }
})