/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const UserNotification              = require("../../../model/usernotification");
const SocketManager                 = require("../SocketManager");
const ChatBox = require("../../../model/chatbox");

/**
 * module for initiate an event, and send new friend request notification to client
 * @clientListen new-notification
 * @eventName    new-accept-friend-request-notification
 */
module.exports = ()=>{
     eventEmitterSocketIOApp.on("new-accept-friend-request-notification", async (userID, ntfID)=>{
        const socketUsers   = await SocketManager.getSocket(userID)
        let newNotification = await UserNotification.getNotificationByID(ntfID)
        let sendDataObject  = {
            ntfID   : ntfID,
            status  : 0,
            type    : 1,
            typeName: "FriendAcceptRequest",
            userID  : newNotification.userIDSend
        }
        const user1 = newNotification.userID
        const user2 = newNotification.userIDSend
        // get room in user1
        const boxs1 = await ChatBox.getChatBoxParticipate(user1)
        const boxs2 = await ChatBox.getChatBoxParticipate(user2)
        let cbID;
        let stop = false
        for(let i = 0; i < boxs1.length && !stop ; i++) {
            for(let j = 0; j < boxs2.length && !stop; j++) {
                if(boxs1[i].cbID === boxs2[j].cbID && boxs1[i].type === 0) {
                    stop = true
                    // send update room message
                    const socketUser1 = await SocketManager.getSocket(user1)
                    if(socketUser1) {
                        socketUser1.forEach((socketID) => {
                            IOServer.io.to(socketID).emit("new-update-room", {
                                cbID: boxs1[i].cbID
                            })
                        })
                    }
                    const socketUser2 = await SocketManager.getSocket(user2)
                    if(socketUser2) {
                        socketUser2.forEach((socketID) => {
                            IOServer.io.to(socketID).emit("new-update-room", {
                                cbID: boxs1[i].cbID
                            })
                        })
                    }
                }
            }
        }
        if(!socketUsers) return null
        socketUsers.forEach((socketID) => {
            IOServer.io.to(socketID).emit("new-notification", sendDataObject)
        });
        
     })
}