/**
 * module dependencies 
 */
const express  = require('express');
const Friend = require('../../model/friend');
const UserNotification = require('../../model/usernotification');
const SystemError = require("../../controller/Exception/SystemError")     
const QueryFailed = require("../../controller/Exception/QueryFailed")

/**
 * variable
 */
const router = express.Router()

/**
 * route for accepting friend request
 * @method POST
 */
router.post('/', async(req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    return Friend.AcceptFriendRequest(req.body.ntfID)
                 .then( async ntfID => {
                    const userSendFriendRequest = await UserNotification.getNotificationByID(ntfID);
                     UserNotification.NewAcceptFriendRequestNotification(userSendFriendRequest.userID,ntfID)
                     return res.send({
                         status: 200,
                         message: "Accepted friend request"
                     })
                 })
                 .catch(err => {
                    if(err instanceof SystemError) {
                        console.log(err)
                        res.status("404")
                        return res.send();
                    }
                    else if(err instanceof QueryFailed) {
                        switch(err.errno) {
                            case 101:
                                return res.send(
                                    {
                                        status: 101,
                                        message: "Friend already"
                                    }
                                )
                            case 102:
                                return res.send(
                                    {
                                        status: 102,
                                        message: "Friend request don't exist"
                                    }
                                )
                            default:
                                res.status("404")
                                return res.send();
                        }
                    }
                    else {
                        console.log(err)
                        res.status("404")
                        return res.send();
                    }
                 }) 
                 


})

module.exports = router