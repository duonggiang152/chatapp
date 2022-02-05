/**
* Module dependencies
*/
const express  = require("express")
const session  = require("./SessionMiddleware")
const passport = require("./PassportMiddleware")
/**
 * Module Export
 */
module.exports = [
    express.json(),
    express.urlencoded({extended: false}),
    session,
    passport.initialize(),
    passport.session()
]