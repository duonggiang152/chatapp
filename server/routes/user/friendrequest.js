/**
 * Module dependencies
 */
const express = require("express")
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
    console.log(req.user)
    if(await Friend.FriendRequest(req.user.id, req.body.userID)) {
        UserNotification.Notification(req.body.userID)
        return res.send({
            status : 200,
            message: "sending success"}
            )
    }
    return res.send({
        status: 400,
        message: "you already sending friend request to this user"}
        )
})



module.exports = router