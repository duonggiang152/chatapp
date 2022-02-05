/**
* Module dependencies
*/
const session = require("express-session")

const SessionMiddleware = session({
                                    secret: 'keyboard',
                                    cookie: { maxAge: 60000 },
                                    resave: false,
                                    saveUninitialized: true
                                })

/**
 * Module Export
 */
module.exports = SessionMiddleware