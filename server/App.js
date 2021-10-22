const express  = require("express")
const app      = express();
const PORT     = process.env.PORT || 3000
const session = require("express-session")
app.use(express.json())
app.use(express.urlencoded())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
app.post("/login", (req, res) => {
    res.send("helloword")
})

app.listen(PORT, (err) => {
    if(err) throw err
    else {
        console.log(`Server running on port: ${PORT}`)
    }
})