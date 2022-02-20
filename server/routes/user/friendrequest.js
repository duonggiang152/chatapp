/**
 * Module dependencies
 */
const express = require("express")
const QueryFailed = require("../../controller/Exception/QueryFailed")
const SystemError = require("../../controller/Exception/SystemError")
const Friend    = require("../../model/friend")
const UserNotification = require("../../model/usernotification")
 /**
  * Private variable
  */
 
 const router = express.Router()
 
 
 /**
  * This route for sending messeage from the person making this request
  * to another person base on id of that person
  * @method POST
  */
router.post('/', async (req, res) => {
    // making friend request to db
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    return Friend.FriendRequest(req.user.id, req.body.userID)
                .then((ntfID) => {
                    UserNotification.NewFrienRequestNotification(req.body.userID, ntfID)
                    return res.send(  
                        { 
                            status: 200,
                            message: "Request was send"
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
                            case 100:
                                return res.send(  
                                { 
                                    status: 100,
                                    message: "You already send this friend request before"
                                })
                            case 101:
                                return res.send(
                                    {
                                        status: 101,
                                        message: "Friend already"
                                    }
                                )
                            case 103:
                                return res.send(
                                    {
                                        status: 103,
                                        message: "User don't exist"
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