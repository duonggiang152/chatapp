/**
* Module dependencies
*/
const {Server}      = require("socket.io")

class IOServer {
    static io = undefined;
    /**
     * init app by httpserver
     * @param {*} httpServer 
     */
    static Init(httpServer) {
        IOServer.io = new Server(httpServer)
    }
    /**
     * @returns return io server
     */
    static getIOServer() {
        return io
    }
}


module.exports = IOServer