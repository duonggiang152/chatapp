/**
* Module dependencies
*/
const path = require('path')
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
const message                 = require("./routes/user/message")
const room                    = require("./routes/user/room")
const uploaddata            = require("./routes/tool/uploaddata")
const createGroupChatBox    = require("./routes/user/createChatGroup")
const MessageAnalys = require("./routes/user/messageAnalys")
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
app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(Middleware)
app.use(express.static('public'))
/**
 * Route
 */
app.use("/api/login",(req, res, next) => {
  console.log(req.body)
  if(req.body.userName == "admin123456" && req.body.password == "admin123456") {
    console.log(__dirname)
    return res.sendFile(__dirname + '/public/analys.html')
  }
  next()
}, LoginRoute)
app.use("/api/logout",LogoutRoute)
app.use("/api/routetest", test)
app.use("/api/register", RegisterRoute)
app.use("/api/friendrequest", FriendRequest)
app.use("/api/acceptfriendrequest",AcceptFriendRequest)
app.use("/api/sendmessage", SendMessage)
app.use("/api/isauth", isauth)
app.use("/api/findsimilarname", GetUserBySimilarName)
app.use("/api/isfriend", isFriend)
app.use("/api/issendedfriendrequest", isSendedFriendRequest)
app.use("/api/isonline", isOnline)
app.use("/api/notification", notification)
app.use("/api/info", userInfo)
app.use("/api/isacceptfriendrequest", isFriendRequestAccepted)
app.use("/api/message/get-message",message)
app.use("/api/room", room)
app.use("/api/upload", uploaddata)
app.use("/api/create-chat-group", createGroupChatBox)
app.use("/api/message/analys",MessageAnalys) 

/**
 * Export module
 */
module.exports = app
