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
    for(let i = 0; i< Middlewares.length; i++)
                io.use(Middlewares[i])
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