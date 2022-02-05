/**
 * Module dependencies
 * @private
 */
const session  = require("./SessionMiddleware")
const passport = require("./PassportMiddleware")
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);


module.exports = [
    wrap(session),
    wrap(passport.initialize()),
    wrap(passport.session())
]