/**
 * Module dependence
 */
const SocketManager = require("../controller/SocketManager")

module.exports = (socket, next) => {
    console.log(socket.request.session)
    if(!socket.request.session.passport || !socket.request.session.passport.user) {
        return next()
    }
    SocketManager.addSocket(socket.request.session.passport.user, socket.id)
    return next()
}