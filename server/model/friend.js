/**
 * Modul dependences
 */
const ParamMustBeNumber = require("../controller/Exception/ParamMustBeNumber");
const QueryFailed = require("../controller/Exception/QueryFailed");
const db   = require("./databaseModel")
const User = require("./user")
/**
 * Friend
 */
class Friend {
    /**
     * Checking if they are both friend
     * @async
     * @param {number} userID1 
     * @param {number} userID2 
     * @return true if friend , false if not
     * @err
     * 
     * TypeErr
     * 
     * SystemErr
     * 
     * Query Err
     * 
     * @static
     */
    static async isFriend(userID1, userID2) {
        if(typeof(userID1) !== typeof(1) || typeof(userID2) !== typeof(1)) {
            throw new TypeError("userID1 and userID2 must be number")
        }
        let query = `SELECT * FROM Friend WHERE userID = ${userID1} AND friendID = ${userID2};`;
        let pairFriend = await db.query(query)
        if(pairFriend.length != 0) {
            return true
        }
        return false
    }
    /**
     * Accept Friend Request base on notification talbe
     * @async
     * @param notificationID
     * @return notificationID
     * @Err 
     * throw QueryErr if exist
     * 
     * errno: 101        ->  both user was already friend or this friend request already accepted
     * 
     * 
     * errno: 102        ->  Friend Request don't exist
     * 
     * throw ParamMustBeNumber exception
     * 
     * throw system Err
     * @static
     */
    static async AcceptFriendRequest(ntfID) {
        if(typeof(ntfID) != typeof(1)) {
            throw new ParamMustBeNumber("ntfID must be number")
        }
        let query = `call AcceptFriendRequest(${ntfID});`
        return  db.query(query)
                  .then(data => data[0][0])
                  
    }
    /**
     * User1 make FriendRequest to User2
     * @async 
     * @param {number} userID1
     * @param {number} userID2
     * @return notification ID announce friend request: if this request successfuly
     * @Err 
     * throw ParamMustBeNumber exception
     * 
     * throw QueryErr exception
     * 
     * mysqlerr : 100        ->  this friend requested was send before
     * 
     * mysqlerr : 101        ->  both user was already friend, this friend request already accepted
     * 
     * mysqlerr : 103        ->  user 1 or user 2 in parameter don't exist
     * 
     * throw system err
     * @static
     */
    static async FriendRequest(userID1, userID2) {
        if(typeof(userID1) != typeof(1) || typeof(userID2) != typeof(1)) {
            throw new ParamMustBeNumber("userID1 and userID2 mustbe number")
        }
        let userNameSendRequest = await User.getUserById(userID1)
        if(!userNameSendRequest) {
            let err =  new QueryFailed("user 1 or user 2 in parameter don't exist")
            throw err
        }
        // set notificationBody
        let notificationBody = {
            typeNo: 0,
            typeName: "friend request",
            message: `${userNameSendRequest.userName} was sending you a friend message`,
            date : new Date(),
            userIDSend: userNameSendRequest.idUser
        }
        const setRequestQuery = `call FriendRequest(${userID1},${userID2},'${JSON.stringify(notificationBody)}');`
        return db.query(setRequestQuery)
                 .then(data => data[0][0].ntfID)   
    }
}

/**
 * Module exports
 */
module.exports = Friend
