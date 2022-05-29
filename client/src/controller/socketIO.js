/**
 * module dependencies
 */
import socketio from "socket.io-client"
// import domain from "../config/domain"
const domain = "http://localhost:80"
class socketIO {
    static socket = socketio("http://localhost:88/")
    /**
     * Connect socketio to server
     * If a connection exist it will disconnect that coonection and reconnect new connection
     */
    static connect() {
        this.socket.disconnect()
        // this.socket.connect(domain)
        this.socket.connect()
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