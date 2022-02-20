/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const UserNotification              = require("../../../model/usernotification");
const SocketManager                 = require("../SocketManager");
const Logger = require("../../Logger/Logger");

/**
 *  type message  
 * 
 * 0: friend request
 * 
 * 1: friendRequestAccept  
 */
module.exports = () => {
    eventEmitterSocketIOApp.on("new-notification", async (userid, ntfID, type) => {
    if(type === 0) {
      const socketUsers = SocketManager.getSocket(userid)
      if(!socketUsers) return;
      socketUsers.forEach(async (socketid) => {
          let newNotification = await UserNotification.getNotificationByID(ntfID)
          let neededInfo      = {
                                   ntfID   : newNotification.ntfID,
                                   ntfBody : JSON.parse(newNotification.notificationBody),
                                   type    : 0,
                                   status  : 0,
                                   userSend : newNotification.userIDSend
                                }
          IOServer.io.to(socketid).emit("new-notification", neededInfo)
      });
      return
    }
   
  })
}