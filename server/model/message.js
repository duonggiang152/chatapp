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
    }  
    /**
     * 
     */
    static async getChatMessage() {

    }
    
}

module.exports = ChatMessage


