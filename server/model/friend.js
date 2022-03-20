/**
 * Modul dependences
 */
const ParamMustBeNumber = require("../controller/Exception/ParamMustBeNumber");
const QueryFailed = require("../controller/Exception/QueryFailed");
const db   = require("./databaseModel")
const User = require("./user");
const UserNotification = require("./usernotification");
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
        let query = `SELECT * FROM Friend WHERE userID = ${userID1} AND friendID = ${userID2} AND status = 0;`;
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
     * @return notificationID anouce friend request was accepted
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
                  .then(data => data[0][0].ntfID)
                  
    }
    static async isFriendRequestAccepted(ntfID) {
        if(typeof(ntfID) != typeof(1)) {
            throw new ParamMustBeNumber("ntfID must be number")
        }
        // get notification 
        const notification =  await UserNotification.getNotificationByID(ntfID)
                                                    .catch(err => {
                                                        return null
                                                    })
        if(!notification) {
            return false
        }
        const userID = notification.userID;
        const userIDSend = notification.userIDSend;
        let query = `
            SELECT *
            FROM Notification
            WHERE userID = ${userIDSend} AND userIDSend = ${userID} AND type = 1;
        
        `
        const result =await db.query(query)
        if(result.length > 0) return true
        return false
       
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
    /**
     * Checking if userID1 was send friend request to userID2 before
     * @async
     * @param {number} userID1 
     * @param {number} userID2 
     * @return  true if request was send before and false if not
     * throw query exceptio
     * throw system err
     * @static
     */
    static async FriendRequestSended(userID1, userID2) {
        if(typeof(userID1) != typeof(1) || typeof(userID2) != typeof(1)) {
            throw new ParamMustBeNumber("userID1 and userID2 mustbe number")
        }
        const query = `
        SELECT * FROM Notification 
        WHERE userID = ${userID2} AND userIDSend = ${userID1} AND type = 0;
        `
        return db.query(query)
                .then(data => {
                    if(data.length === 0) return false
                    return true
                })
            
    }
}

/**
 * Module exports
 */
module.exports = Friend
