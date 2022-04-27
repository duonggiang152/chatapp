/**
* Module dependencies
*/
const ExpressApp                            = require("./ExpressApp")
const {createServer}                        = require("http")
const SocketIOApp   = require("./SocketIOApp")
/**
 * Local variable
 * @private
 */
const PORT     = process.env.PORT || 3000;

/**
 * set up apps
 */
const httpServer = createServer(ExpressApp)
SocketIOApp(httpServer)


httpServer.listen(PORT,(err) => {
    console.log(`Server running on port ${PORT}`)
})