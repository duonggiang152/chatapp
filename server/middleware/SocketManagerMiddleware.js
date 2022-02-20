/**
 * Module dependence
 */
const SocketManager = require("../controller/socketIOAppController/SocketManager")

module.exports = (socket, next) => {
    if(!socket.request.session.passport || !socket.request.session.passport.user) {
        return next()
    }
    SocketManager.addSocket(socket.request.session.passport.user, socket.id)
    return next()
}