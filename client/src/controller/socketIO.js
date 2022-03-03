/**
 * module dependencies
 */
import socketio from "socket.io-client"
import domain from "../config/domain"
class socketIO {
    static socket = socketio(domain)
    /**
     * Connect socketio to server
     * If a connection exist it will disconnect that coonection and reconnect new connection
     */
    static connect() {
        this.socket.disconnect()
        this.socket.connect(domain, {autoConnect: false, reconnection: false})
        this.socket.on("connect", () => {
            console.log("success conneting with server")
        })
        this.socket.on("disconnect", () => {
            console.log("disconect with server")
        })
    }
    static listen(event, callback) {
        this.socket.removeAllListeners(event)
        this.socket.on(event, callback)
    }
}

export default socketIO