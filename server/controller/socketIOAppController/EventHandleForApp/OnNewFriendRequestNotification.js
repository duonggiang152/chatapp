/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const UserNotification              = require("../../../model/usernotification");
const SocketManager                 = require("../SocketManager");



module.exports = () => {
  /**
   * Sendding a new friend request notification to client
   * @EventListen new-notification
   */
    eventEmitterSocketIOApp.on("new-friendrequest-notification", async (userid, ntfID) => {
    const socketUsers = SocketManager.getSocket(userid)
    let newNotification = await UserNotification.getNotificationByID(ntfID)
    let neededInfo      = {
                             ntfID   : newNotification.ntfID,
                             ntfBody : JSON.parse(newNotification.notificationBody),
                             type    : 0,
                             status  : 0,
                             userSend : newNotification.userIDSend
                          }
    if(!socketUsers) return;
    socketUsers.forEach((socketid) => {
        IOServer.io.to(socketid).emit("new-notification", neededInfo)
    })
    
  })
}