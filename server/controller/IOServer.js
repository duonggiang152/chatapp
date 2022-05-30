/**
* Module dependencies
*/
const {Server}      = require("socket.io")
// const { createAdapter } = require("@socket.io/cluster-adapter");
// const { setupWorker } = require("@socket.io/sticky");
class IOServer {
    static io = undefined;
    /**
     * init app by httpserver
     * @param {*} httpServer 
     */
    static Init(httpServer) {
        IOServer.io = new Server(httpServer)
        // IOServer.io.adapter(createAdapter());
        // setupWorker(IOServer.io);
    }
    /**
     * @returns return io server
     */
    static getIOServer() {
        return io
    }
}


module.exports = IOServer