const InitNewNotificationAppHandle = require("./EventHandleForApp.js/OnNewNotification")
const eventEmitterSocketIOApp      = require("./eventsocketioapphandle")


module.exports = () => {
    eventEmitterSocketIOApp.removeAllListeners()
    InitNewNotificationAppHandle()
}

