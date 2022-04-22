const DataBase = require("./databaseModel")

/**
 * modul
 */
class ChatMessage {
    /**
     * Add new Message to databases
     * @static
     * @async
     * @param {number} idBox 
     * @param {number} idUser 
     * @param {string} message
     * @return Object(mID, cbID, userID, message, datetime) for new message insert to db
     * @err 
     * query err
     * 
     * 109  : chatbox don't exist ot user not in chat box
     * 
     * system err 
     * typeerr
     */
    static async addNewChatMessage(idBox,idUser, message) {
        if(typeof(idBox) != typeof(1) || typeof(idUser) != typeof(1)) {
            throw new TypeError("boxId and userID have to be number")
        }
        if(typeof(message) != typeof("")) {
            throw new TypeError("message have to be a string")
        }
        const query = `CALL AddMessageToChatBox(${idBox},${idUser},"${message}");`
        return DataBase.query(query)
                        .then(data => data[0][0])
    }  
    /**
     * get chat message infomation by ID
     * @static
     * @async
     * @return Object(mID, cbID, userID, message, datetime)
     * @err 
     * 
     * throw queryfailed
     * 
     *  throw dberr 
     */
    static async getChatMessagebyID(mID) {
        const query = `SELECT * from ChatMessage WHERE mID = ${mID};`
        return DataBase.query(query)
                       .then(data => data[0]) 

    }
    /**
     * Get Message
     * @async
     * @static
     * @param {number} chatboxID 
     * @param {number} offsetID 
     * @param {number} limit 
     * @returns arrayofmessage
     */
    static async getMessage(chatboxID,offsetID, limit) {
        if(!offsetID) offsetID = 0
        if(!limit)    limit    = 10
        const conditionparam = `AND mID < ${offsetID}` 
        const query = `
            SELECT mID, cbID, userID, userName, message, datetime
            FROM ChatMessage, Users
            WHERE cbID =  ${chatboxID} ${ offsetID ? conditionparam : ""} AND userId = idUser
            ORDER BY mID DESC
            LIMIT ${limit};
        `
        return DataBase.query(query)
                       
    }
}

module.exports = ChatMessage


