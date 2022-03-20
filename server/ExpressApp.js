/**
* Module dependencies
*/
const cors                  = require("cors")
const express               = require("express")
const LoginRoute            = require("./routes/authentication/login.js")
const LogoutRoute           = require("./routes/authentication/Logout")
const RegisterRoute         = require("./routes/authentication/register")
const Middleware            = require("./middleware/ExpressAppMiddlewares")
const FriendRequest         = require("./routes/user/friendrequest")
const AcceptFriendRequest   = require("./routes/user/acceptFriendRequest")
const SendMessage           = require("./routes/user/sendMessage")
const isauth                = require("./routes/authentication/isauth")
const GetUserBySimilarName  = require("./routes/tool/getusersimilarname")
const isFriend              = require("./routes/tool/isfriend")
const isSendedFriendRequest = require("./routes/tool/idFriendRequestSendBefore")
const isOnline              = require("./routes/tool/isOnline")
const notification          = require("./routes/user/getnotification")
const userInfo              = require("./routes/user/info")
const isFriendRequestAccepted = require("./routes/tool/isAcceptFriendRequest")
// need for testing
const test = require("./routes/routetest")
/**
 * Local variable
 * @private
 */
const app      = express();
app.use(cors())
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
app.use("/isauth", isauth)
app.use("/findsimilarname", GetUserBySimilarName)
app.use("/isfriend", isFriend)
app.use("/issendedfriendrequest", isSendedFriendRequest)
app.use("/isonline", isOnline)
app.use("/notification", notification)
app.use("/info", userInfo)
app.use("/isacceptfriendrequest", isFriendRequestAccepted)
/**
 * Export module
 */
module.exports = app
