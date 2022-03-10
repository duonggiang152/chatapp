/**
* Module dependencies
*/
const session = require("express-session")

const SessionMiddleware = session({
                                    secret: 'keyboard',
                                    cookie: { maxAge: 6000000 },
                                    resave: false,
                                    saveUninitialized: true
                                })

/**
 * Module Export
 */
module.exports = SessionMiddleware