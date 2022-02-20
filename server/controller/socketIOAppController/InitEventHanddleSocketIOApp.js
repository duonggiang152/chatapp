const InitNewFriendRequestNotification          = require("./EventHandleForApp/OnNewFriendRequestNotification")
const InitNewAcceptFriendRequestNotification    = require("./EventHandleForApp/OnNewAcceptFriendRequestNotification")
const eventEmitterSocketIOApp                   = require("./eventsocketioapphandle")

module.exports = () => {
    eventEmitterSocketIOApp.removeAllListeners()
    InitNewFriendRequestNotification()
    InitNewAcceptFriendRequestNotification()
}

