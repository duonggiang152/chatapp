/**
 * Module dependencies
 */
const express = require("express")
const Friend = require("../../model/friend")


const route = express.Router()
/**
 * Makling request for checking if friend request was send to this user before
 * @param userID {number} 
 * response true if was sended and false if not
 */
route.get("/:userID?",async (req, res) => {
    try {
        let userid1 = req.user.id
        let userid2 = parseInt(req.params.userID)
        await Friend.FriendRequestSended(userid1, userid2)
                    .then(data => {
                        res.status(200)
                        return res.send({sended: data})
                    })
                    .catch(err => {
                        res.status(404)
                        return res.send()
                    })
    } catch(err) {
        res.status(404)
        return res.send()
    }
})


module.exports = route
