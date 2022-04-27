/**
 * module dependencies
 */
import io from "socket.io-client"
import domain from "../config/domain"
class socketIO {
    static socket = io()
    /**
     * Connect socketio to server
     * If a connection exist it will disconnect that coonection and reconnect new connection
     */
    static connect() {
        this.socket = io()
        // this.socket.disconnect()
        this.socket.connect(domain)
        this.socket.on("connect", () => {
            console.log("success conneting with server")
        })
        this.socket.on("disconnect", () => {
            console.log("disconect with server")
        })
    }
    /**
     * Create a listener to global socketIO
     * @param {string} event 
     * @param {function} callback 
     */
    static listen(event, callback) {
        this.socket.removeAllListeners(event)
        this.socket.on(event, callback)
    }
}

export default socketIO