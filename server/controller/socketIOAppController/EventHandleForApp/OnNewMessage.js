/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const SocketManager                 = require("../SocketManager");
const ChatBox                       = require("../../../model/chatbox");
const Logger = require("../../Logger/Logger");


 module.exports = () => {
    eventEmitterSocketIOApp.on("new-message",async (userID, messageInfo) => {
        const boxMember = await ChatBox.getMemberOfChatBox(messageInfo.cbID)
        const sendPacket = {
            userID:messageInfo.userId,
            message:messageInfo.message,
            datetime:messageInfo.datetime
        }
        boxMember.forEach(async member => {
            if(member.userID !== messageInfo.userId) {
                const sockets = await SocketManager.getSocket(member.userID)
                sockets.forEach(socket => {
                    IOServer.io.to(socket).emit("new-message", sendPacket)
                })
            }
        });
    }) 
 }