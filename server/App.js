/**
 * Module dependencies
 */
const express  = require("express")
const session = require("express-session")

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
   { secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
   }))
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())


/**
 * Route
 */
app.post("/login", (req, res) => {
    console.log(req.body)
    res.send("hello world")
})

app.listen(PORT, (err) => {
    if(err) throw err
    else {
        console.log(`Server running on port: ${PORT}`)
    }
})