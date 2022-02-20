/**
 * Module dependence
 */

class SocketManager {
    /**
     * This variable for store pair ID user and ID socket
     */
    static SocketStorage = new Object()
    /**
     * This Method will add a socket to the storage
     * @sync
     * @param {int}      userID
     * @param {string}    SocketID
     * @void 
     * @static
     */
    static addSocket(userID, SocketID) {
        if(!this.SocketStorage[userID]) {
            this.SocketStorage[userID] = new Array()
        }
        this.SocketStorage[`${userID}`].push(SocketID)
    }
    /**
     * This method will return an array of sockets which match with the userID
     * @sync
     * @param {String,number} userID
     * @return array if exist socket mathch with the ID and null if not
     * @static
     */
    static getSocket(userID) {
        if(!this.SocketStorage[userID]) return null
        return this.SocketStorage[userID]
    }
    /**
     * 
     */
}



/**
 * Module export
 */

module.exports = SocketManager;