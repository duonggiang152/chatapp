const InitNewFriendRequestNotification          = require("./EventHandleForApp/OnNewFriendRequestNotification")
const InitNewAcceptFriendRequestNotification    = require("./EventHandleForApp/OnNewAcceptFriendRequestNotification")
const InitNewMessageNotification                = require("./EventHandleForApp/OnNewMessage")
const eventEmitterSocketIOApp                   = require("./eventsocketioapphandle")

module.exports = () => {
    eventEmitterSocketIOApp.removeAllListeners()
    InitNewFriendRequestNotification()
    InitNewAcceptFriendRequestNotification()
    InitNewMessageNotification()
}

