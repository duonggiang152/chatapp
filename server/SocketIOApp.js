const Logger = require("./controller/Logger/Logger");

/**
* Module dependencies
*/
const {Server}    = require("socket.io")
const Middlewares = require("./middleware/SocketIOAppMiddlewares")
/**
 * @private
 */
let io;
module.exports = function SocketIOApp(httpServer) {
    io = new Server(httpServer)
    // io.use(Middlewares)
    io.use(Middlewares[0])
    io.use(Middlewares[1])
    io.use(Middlewares[2])
    io.on('connection', (socket) => {
        console.log(socket.request.session);
        if(!socket.request.session.passport || !socket.request.session.passport.user) {
          io.emit("chatmessage", "you are not authenticated")
          socket.disconnect()
        }
        else {
          io.emit("chatmessage", "you are authenticated")
          socket.disconnect()
        }
        console.log(1)
        socket.on('message1', (msg) => {
          io.emit("chatmessage", msg.a)
        });
      });
}