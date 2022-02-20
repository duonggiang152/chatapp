/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const UserNotification              = require("../../../model/usernotification");
const SocketManager                 = require("../SocketManager");

/**
 * module for initiate an event, and send new friend request notification to client
 * @clientListen new-notification
 * @eventName    new-accept-friend-request-notification
 */
module.exports = ()=>{
     eventEmitterSocketIOApp.on("new-accept-friend-request-notification", async (userID, ntfID)=>{
        const socketUsers   = SocketManager.getSocket(userID)
        let newNotification = await UserNotification.getNotificationByID(ntfID)
        let sendDataObject  = {
            ntfID   : ntfID,
            status  : 0,
            type    : 1,
            typeName: "FriendAcceptRequest",
            userID  : newNotification.userIDSend
        }
        if(!socketUsers) return null
        socketUsers.forEach((socketID) => {
            IOServer.io.to(socketID).emit("new-notification", sendDataObject)
        });
     })
}