/**
* Module dependencies
*/
const session = require("express-session")
const {configSigleConnection} = require("../config/databaseconfig")
const MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(configSigleConnection);
const SessionMiddleware = session({
                                    secret: 'keyboard',
                                    store: sessionStore,
                                    cookie: { maxAge: 6000000 },
                                    resave: false,
                                    saveUninitialized: true
                                })

/**
 * Module Export
 */
module.exports = SessionMiddleware