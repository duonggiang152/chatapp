/**
 * Module depencence
 */
const QueryFailed = require("../controller/Exception/QueryFailed")
const DataBase = require("./databaseModel")
const Friend = require("./friend")
const User = require("./user")


class ChatBox {
    static async getChatBoxByID(cbID) {
        const query = `
            SELECT *
            FROM ChatBox
            WHERE cbID = ${cbID}
        `
        return DataBase.query(query)
                        .then(data => {
                            return data[0]
                        })
    }
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
    static async addUser(boxID,userID1 , userID2) {
        let query = `CALL AddMemberToGroupChat(${boxID}, ${userID1}, ${userID2})`;
        return DataBase.query(query)
    }
    /**
     * Get member in chatBox base on chatbox ID
     * @async
     * @static
     * @param {number}
     * @return array of chatbox member (cbID, userID, admin, nickname)
     * @err 
     * 
     * throw queryFaile
     * 
     * throw DBERR
     * 
     */
    static async getMemberOfChatBox(cbID) {
        let query = `SELECT * FROM ChatBoxMember WHERE cbID = ${cbID};`
        return DataBase.query(query)
    }
    /**
     * get chatbox which user take part in
     * @param {number} userID 
     * @param {number} offsetID 
     * @param {number} limit 
     */
    static async getChatBoxParticipate(userID, offsetID, limit) {
        // get datemodifioffsetid
        if(!userID) return []
        let optionparam;
        if(!limit) limit = 1000
        if(!offsetID) {
            optionparam = ""
        }
        else {
            // check roomID exist
            const query = `
                SELECT *
                FROM ChatBox
                WHERE cbID = ${offsetID}
            `
            const data = await DataBase.query(query)
                                        .catch(err => {
                                            return null;
                                        })
            if(data.length >= 1) {
                optionparam = `AND datemodifi < '${data[0].datemodifi}'`
            }
            if(!data) return []
        }
        const query =`
            SELECT ChatBox.cbID, datemodifi, ChatBox.type
            FROM ChatBox, ChatBoxMember
            WHERE userID = ${userID} AND ChatBox.cbID = ChatBoxMember.cbID ${optionparam}
            ORDER BY datemodifi DESC
            LIMIT ${limit};
        `
        return  DataBase.query(query)
    }

}

module.exports = ChatBox