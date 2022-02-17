/**
* Module dependencies
*/
const {Server}      = require("socket.io")
const Middlewares   = require("./middleware/SocketIOAppMiddlewares")
const SocketManager = require("./controller/SocketManager");
const Logger        = require("./controller/Logger/Logger");
const Friend        = require("./model/friend") 
const eventEmitterSocketIOApp = require("./controller/eventsocketioapphandle");
const UserNotification = require("./model/usernotification");
/**
 * @private
 */
// socketIOServer
let io;

module.exports= function SocketIOApp(httpServer) {
    eventEmitterSocketIOApp.removeAllListeners()
    if(io) {
      Logger.Error("You only need init this app once!!")
    }
    // init server
    io = new Server(httpServer)
    // init middleware
    for(let i = 0; i< Middlewares.length; i++)
                io.use(Middlewares[i])
    // cheking authentication when user init a connection
    io.on('connection', (socket) => {
      console.log(SocketManager.SocketStorage)
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
    // event haddle
    eventEmitterSocketIOApp.on("new-notification", async (userid) => {
      const socketUsers = SocketManager.getSocket(userid)
      if(!socketUsers) return;
      socketUsers.forEach(async (socketid) => {
          let newNotification = await UserNotification.getUserNotification(userid)
          console.log(`user id ${userid}`)
          io.to(socketid).emit("new-notification", newNotification)
      });
    })

}