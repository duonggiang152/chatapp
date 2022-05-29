/**
 * Module dependence
 */
const DataBase = require("../../model/databaseModel")
class SocketManager {
    static clearSocket() {
        const query = `
        DELETE FROM SocketIO;
        `
         DataBase.query(query)
            .then(data => {
                console.log("clear: socketio")
            })
            .catch(err => {
                console.log(err)
            })
    }
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
        const query = `
            INSERT INTO SocketIO
            values(${userID}, "${SocketID}")
        `
        DataBase.query(query)
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        // if(!SocketManager.SocketStorage[userID]) {
        //     SocketManager.SocketStorage[userID] = new Array()

        // }
        // SocketManager.SocketStorage[`${userID}`].push(SocketID)
    }
    /**
     * this method will remove a socket to the storage
     * @param {int} userID 
     * @param {string} socketID 
     * @returns 
     */
    static disconnectSocket(userID, socketID) {
        if (!SocketManager.SocketStorage[userID]) return
        const index = SocketManager.SocketStorage[userID].indexOf(socketID)
        if (index < 0) return
        SocketManager.SocketStorage[userID].splice(index, 1)
    }
    /**
     * This method will return an array of sockets which match with the userID
     * @sync
     * @param {String,number} userID
     * @return array if exist socket mathch with the ID and null if not
     * @static
     */
    static async getSocket(userID) {
        const query = `
            SELECT socketID from SocketIO WHERE userID = ${userID};
        `
        return await DataBase.query(query)
            .then(datas => {
                const result = datas.map((data) => {
                    return data.socketID
                })
                return result
            })
            .catch(err => {
                return []
            })
        // return this.SocketStorage[userID]
    }
    /**
     * 
     */
}



/**
 * Module export
 */
module.exports = SocketManager;