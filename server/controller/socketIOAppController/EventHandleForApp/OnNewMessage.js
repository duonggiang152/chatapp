/**
 * module dependences
 */
const eventEmitterSocketIOApp       = require("../eventsocketioapphandle");
const IOServer                      = require("../../IOServer")
const SocketManager                 = require("../SocketManager");
const ChatMessage = require("../../../model/message");


 module.exports = () => {
    eventEmitterSocketIOApp.on("new-message", (userID, cbID) => {
        const boxChat = ChatMessage.getChatMessagebyID(messageID)
    }) 
 }