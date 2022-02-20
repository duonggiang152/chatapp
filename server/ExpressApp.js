/**
* Module dependencies
*/
const express               = require("express")
const LoginRoute            = require("./routes/authentication/login.js")
const LogoutRoute           = require("./routes/authentication/Logout")
const RegisterRoute         = require("./routes/authentication/register")
const Middleware            = require("./middleware/ExpressAppMiddlewares")
const FriendRequest         = require("./routes/user/friendrequest")
const AcceptFriendRequest   = require("./routes/user/acceptFriendRequest")
const SendMessage           = require("./routes/user/sendMessage")
// need for testing
const test = require("./routes/routetest")
/**
 * Local variable
 * @private
 */
const app      = express();


/**
 * Middleware
 */
app.use(Middleware)
/**
 * Route
 */
app.use("/login", LoginRoute)
app.use("/logout",LogoutRoute)
app.use("/routetest", test)
app.use("/register", RegisterRoute)
app.use("/friendrequest", FriendRequest)
app.use("/acceptfriendrequest",AcceptFriendRequest)
app.use("/sendmessage", SendMessage)
/**
 * Export module
 */
module.exports = app
