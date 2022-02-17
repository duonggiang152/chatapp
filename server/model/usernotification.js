/**
 * Module depences
 */
const databaseModel = require("./databaseModel")
const eventSocketIOAppHandle = require("../controller/eventsocketioapphandle");
const Error = require("../controller/Error/Error.js/Error");
const SystemError = require("../controller/Exception/SystemError");
/**
 * UserNotification 
 */
class UserNotification {
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
     * Notifi user have new message
     * @sync 
     * @param {numer} userID 
     * @void
     */
    static Notification(userID) {
        eventSocketIOAppHandle.emit("new-notification", userID)
    }
    
}



module.exports = UserNotification

