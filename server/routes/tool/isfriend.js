/**
 * Module dependencies
 * @private
 */
 const express = require("express")
const Friend = require("../../model/friend")
const User = require("../../model/user")
 
 /**
  * local variable
  * @private
  */
const router  = express.Router()
/**
 * Checking if user was friend of user send request
 * 
 * option "/:userid" pram userid will check
 * 
 * default   base on body
 * example 1
 * req    isfriend/123456
 * res    [{id: 123456, friend:false}]
 * example 2
 * req    
 * header: content-type: application/json
 * url   :isfriend/
 * body   [123456, 7891011]
 * 
 * res  : [{id: 123456, friend: true}, {id: 7891011, friend: fasle}]
 * 
 *  require user to login to use this url, param if esist must be number
 *  resstatus : 404   => usernot login
 * 
 */
router.get("/:userid?", async (req, res) => {
    if(!req.user) {
        res.status(404)
        return res.send()
    }
    try{
    // data for checking friend
    let idUser = parseInt(req.user.id)
    let idList = []
    // convert userid to number
    if(req.params.userid) {
        let userID;
        userID = parseInt(req.params.userid)
        idList.push(userID)
    }
    else (
        idList = req.body.listID
    )
    let checkFriendList = []
    // checking if id was friend
    for(let i = 0; i < idList.length; i++) {
        idList[i] = parseInt(idList[i])
        await Friend.isFriend(idUser,idList[i])
                    .then(data => {
                        checkFriendList.push({id: idList[i], friend: data})
                    })
    }
    res.status(200)
    return res.send(checkFriendList)
    }  
    catch(err) {
        console.log(err)
        res.status(404)
        return res.send()
    }
})

module.exports = router