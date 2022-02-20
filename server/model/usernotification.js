/**
 * Module depences
 */
const databaseModel = require("./databaseModel")
const eventSocketIOAppHandle = require("../controller/socketIOAppController/eventsocketioapphandle");
const Error = require("../controller/Error/Error.js/Error");
const SystemError = require("../controller/Exception/SystemError");
const DataBase = require("./databaseModel");
/**
 * UserNotification 
 */
class UserNotification {
    /**
     * get the notification infomation by it ID
     * @async
     * @static
     * @param {number} ntfID 
     * @return notification data(ntfID, userID, userIDSend, notificationBody,status, type)
     * @err
     * 
     * typeErr
     * 
     * QueryFailed
     * 
     * DBERR
     * 
     */
    static async getNotificationByID(ntfID) {
        if(typeof(ntfID) != typeof(1))
            throw new TypeError("notification id must be number")
        const Query = `SELECT * FROM Notification WHERE ntfID = ${ntfID};`
        return DataBase.query(Query)
                        .then(data => data[0])
    }
    /**
     * getUserNewNotification by ID user, the result will 
     * return all the notification which this user wasn't read yet  base on the latest
     * nitificatioID user was read
     * @async
     * @param   {number} userID
     * @param   {number} FromNotificationID
     * @static  
     * @returns array of new infomation
     * @Err throw System Err
     */
    static async getUserLatestNotification(userID, FromNotificationID) {
        if(!FromNotificationID) {
            
        }
        const query = `
            SELECT * 
            FROM Notification
            WHERE userID = '${userID}' AND ntfID > ${FromNotificationID}
        `;
        return  databaseModel.query(query)
                            .then(data => {
                            return data
                            })
                            .catch(err => {
                            Error.ExamineSystemError(err)
                            throw new SystemError()
                            })
    }
    /**
     * get All the notification that was sending from begin to notification
     * 
     * begin : undefine -> from the lates notification
     * begin : number   -> get the notification aftet that notification ID
     * @async
     * @param {int} userID
     * @param {int} begin 
     * @param {int} notificationNumber 
     * @return {Array} An array of notification
     */
    static async getUserNotification(userID, begin, notificationNumber) {
        if(!begin) {
            // 10 lates notifications
            const query = `
                SELECT *
                FROM Notification
                WHERE userID = ${userID}
                ORDER BY ntfID DESC
                LIMIT 10;
            `
            return  databaseModel.query(query)
                            .then(data => {
                            return data
                            })
                            .catch(err => {
                            Error.ExamineSystemError(err)
                            throw new SystemError()
                            })
        }
        if(!notificationNumber) {
            notificationNumber = 10
        }
        const query = `
        SELECT *
        FROM Notification
        WHERE userID = ${userID} AND ntfID < ${begin}
        ORDER BY ntfID DESC
        LIMIT ${notificationNumber};
    `
    return  databaseModel.query(query)
                    .then(data => {
                    return data
                    })
                    .catch(err => {
                    Error.ExamineSystemError(err)
                    throw new SystemError()
                    })
    }
    /**
     * Notificating an user base on ID have new FriendRequest
     * @ClientListionChannel new-notification
     * @sync 
     * @param {numer} userID 
     * @void
     */
    static NewFrienRequestNotification(userID, ntfID) {
        eventSocketIOAppHandle.emit("new-friendrequest-notification", userID, ntfID)
    }
    /**
     * Notificating user base on userID when friend request was accepted
     * @param {number} userID 
     * @param {number} ntfID 
     */
    static NewAcceptFriendRequestNotification(userID, ntfID) {
        eventSocketIOAppHandle.emit("new-accept-friend-request-notification", userID, ntfID)
    }
    /**
     * notification to user in same chatbox that new message was send
     * @param {number} userID 
     * @param {Object} message(mID, cbID, userID, message, datetime) 
     */
    static NewMessageNotification(userID, message) {
        eventSocketIOAppHandle.emit("new-message",userID, message)
    }
}



module.exports = UserNotification