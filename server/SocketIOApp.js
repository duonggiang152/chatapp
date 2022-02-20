/**
* Module dependencies
*/
const IOServer    = require("./controller/IOServer")
const Middlewares   = require("./middleware/SocketIOAppMiddlewares")
const SocketManager = require("./controller/socketIOAppController/SocketManager");
const Logger        = require("./controller/Logger/Logger");
const Friend        = require("./model/friend") 
const InitSocketIOAppHanddle = require("./controller/socketIOAppController/InitEventHanddleSocketIOApp")

module.exports= function SocketIOApp(httpServer) {
    if(IOServer.io) {
      Logger.Error("You only need init this app once!!")
    }
    // init server
    IOServer.Init(httpServer)
    // get eventlistener
    let io = IOServer.io
    // init middleware
    for(let i = 0; i< Middlewares.length; i++)
                io.use(Middlewares[i])
    // cheking authentication when user init a connection
    io.on('connection', (socket) => {
        if(!socket.request.session.passport || !socket.request.session.passport.user) {
          let dataSend = {
            message: "You are unauthenticated"
          }
          io.emit("chatmessage", dataSend)
          return socket.disconnect()
        }
        else {
          let dataSend = {
            message: "You are authenticated"
          }
          io.emit("chatmessage", dataSend)
        }
        // this method will get all the new notification base on latest 
        // notification the client have
        io.on('uncheck-new-notification', async (latestNotificaionId) => {
          const FriendRequest = Friend.FriendRequest()

        })
        /**
         * this method will send a friend request to user base on id user's
         */
        io.on('friendrequest', (id) => {

        })
      });
    InitSocketIOAppHanddle()

}