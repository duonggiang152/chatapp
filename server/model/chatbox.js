/**
 * Module depencence
 */
const QueryFailed = require("../controller/Exception/QueryFailed")
const DataBase = require("./databaseModel")
const Friend = require("./friend")
const User = require("./user")


class ChatBox {
    /**
     * Create a chatbox can add more then two member, nead at leat one member to setup
     * @async
     * @param {number} userCreate 
     * @param {number} firstMemberID
     * @param {string} name
     * @return void
     * @err
     * 
     * throw SystemErr
     * 
     * throw QuerryFailed
     * 
     * errno : 99, 103    userCreateID or firstMemberID don't exist
     *  
     * errno : 100   userCreateID or firstMemberID was not friend
     * 
     * @static
     */
    static async createGroupChatBox(userCreateID, firstMemberID, name) {
        // check user exist
        let userCreate = User.getUserById(userCreateID)
        let firstMember = User.getUserById(firstMemberID)
        if(!userCreate || !firstMember) {
            let Err = new QueryFailed("userCreateID or firstMemberID don't exist")
            Err.errno = 99
        }
        // check both are friend
        if(await Friend.isFriend(userCreateID, firstMemberID)) {
            let Err = new QueryFailed("firstMemberID was not friend of userCreateID")
            Err.errno = 100
        }

        // insert to database
        let query = `CALL CreateGroupChat(${userCreateID}, ${firstMemberID}, ${name})`

        return DataBase.query(query)
    }
    /**
     * Add new Member to chatBox
     * @static
     * @async
     * @param {number} boxID 
     * @param {number} userID1 
     * @param {number} userID2 
     * 
     * @return void
     * @err 
     * QueryErr
     * 
     * mysqlerr : 103        ->  user 1 or user 2 in parameter don't exist
     * 
     * mysqlerr : 106        ->  chat box don't exist or userID1 was not admin of chatbox 
     * 
     * mysqlerr : 107        ->  This person already in chatbox
     * 
     * DBERR
     */
    static addUser(boxID,userID1 , userID2) {
        let query = `CALL AddMemberToGroupChat(${boxID}, ${userID1}, ${userID2})`;
        return DataBase.query(query)
    }
}

module.exports = ChatBox



